from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.conf import settings

from rest_framework import generics, viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view

from rest_framework_simplejwt.tokens import RefreshToken

import razorpay

from .models import Product, Cart, Order, Wishlist
from .serializers import (
    ProductSerializer,
    CartSerializer,
    OrderSerializer,
    WishlistSerializer,
    SignupSerializer,
)

# ------------------ PRODUCT ------------------
class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]


# ------------------ CART ------------------
class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        product_id = request.data.get("product_id")
        color = request.data.get("selected_color")
        size = request.data.get("selected_size")
        quantity = int(request.data.get("quantity", 1))

        product = get_object_or_404(Product, id=product_id)

        cart_item, created = Cart.objects.get_or_create(
            user=request.user,
            product=product,
            selected_color=color,
            selected_size=size,
            defaults={"quantity": quantity}
        )

        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        serializer = self.get_serializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        cart_item = self.get_object()
        quantity = request.data.get("quantity")

        if quantity is None:
            return Response({"error": "Quantity not provided"}, status=400)

        quantity = int(quantity)
        if quantity < 1:
            quantity = 1

        cart_item.quantity = quantity
        cart_item.save()

        serializer = self.get_serializer(cart_item)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        cart_item = self.get_object()
        cart_item.delete()
        return Response(
            {"message": "Item removed from cart"},
            status=status.HTTP_204_NO_CONTENT
        )


# ------------------ ORDER ------------------
class OrderViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        orders = Order.objects.filter(user=request.user).order_by("-created_at")
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = OrderSerializer(
            data=request.data,
            context={"request": request}
        )

        if serializer.is_valid():
            order = serializer.save()
            return Response(
                {
                    "message": "Order created successfully",
                    "order_id": order.id,
                    "total_price": order.total_price,
                    "status": order.status,
                },
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ------------------ WISHLIST ------------------
class WishlistViewSet(viewsets.ModelViewSet):
    serializer_class = WishlistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        product_id = request.data.get("product_id")

        if not product_id:
            return Response({"error": "product_id is required"}, status=400)

        product = get_object_or_404(Product, id=product_id)

        wishlist, _ = Wishlist.objects.get_or_create(
            user=request.user,
            product=product
        )

        serializer = self.get_serializer(wishlist)
        return Response(serializer.data, status=201)


# ------------------ PRODUCT DETAIL ------------------
class ProductDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        product = get_object_or_404(Product, id=pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data)


# ------------------ AUTH ------------------
class SignupView(generics.CreateAPIView):
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        return Response({
            "username": user.username,
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        }, status=201)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user_obj = User.objects.filter(email=email).first()
        if not user_obj:
            return Response({"error": "User not found"}, status=400)

        user = authenticate(username=user_obj.username, password=password)
        if not user:
            return Response({"error": "Invalid credentials"}, status=400)

        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        })


# ------------------ RAZORPAY ------------------
@api_view(["POST"])
def create_razorpay_order(request):
    user = request.user
    cart_items = Cart.objects.filter(user=user)

    if not cart_items.exists():
        return Response({"error": "Cart is empty"}, status=400)

    total = sum(item.product.price * item.quantity for item in cart_items)

    order = Order.objects.create(
        user=user,
        total_price=total,
        payment_status="PENDING",
        status="Pending"
    )

    client = razorpay.Client(
        auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
    )

    razorpay_order = client.order.create({
        "amount": int(total * 100),
        "currency": "INR",
        "payment_capture": 1
    })

    order.razorpay_order_id = razorpay_order["id"]
    order.save()

    return Response({
        "order_id": order.id,
        "razorpay_order_id": razorpay_order["id"],
        "amount": razorpay_order["amount"],
        "key": settings.RAZORPAY_KEY_ID
    })


@api_view(["POST"])
def verify_payment(request):
    data = request.data
    client = razorpay.Client(
        auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
    )

    try:
        client.utility.verify_payment_signature({
            "razorpay_order_id": data["razorpay_order_id"],
            "razorpay_payment_id": data["razorpay_payment_id"],
            "razorpay_signature": data["razorpay_signature"],
        })

        order = Order.objects.get(
            razorpay_order_id=data["razorpay_order_id"]
        )
        order.payment_status = "SUCCESS"
        order.status = "Confirmed"
        order.razorpay_payment_id = data["razorpay_payment_id"]
        order.razorpay_signature = data["razorpay_signature"]
        order.save()

        Cart.objects.filter(user=order.user).delete()

        return Response({"message": "Payment verified successfully"})

    except Exception:
        return Response({"error": "Payment verification failed"}, status=400)
