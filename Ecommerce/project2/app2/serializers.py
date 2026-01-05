from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, ProductImage, Cart, Wishlist, Order, OrderItem


# ProductImage Serializer
class ProductImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = ProductImage
        fields = ["id", "image"]

# Product Serializer
class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    colors = serializers.ListField(child=serializers.CharField(), required=False)
    sizes = serializers.ListField(child=serializers.CharField(), required=False)

    class Meta:
        model = Product
        fields = '__all__'


# Cart Serializer
class CartSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), source='product', write_only=True
    )

    class Meta:
        model = Cart
        fields = ['id', 'user', 'product', 'product_id', 'quantity', 'selected_color', 'selected_size', 'added_at']
        extra_kwargs = {
            "user": {"read_only": True}
        }


# Wishlist Serializer
class WishlistSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Wishlist
        fields = ["id", "product"]


# Detail serializer
class WishlistDetailSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Wishlist
        fields = ['id', 'product']


#Order_item_serializer
class OrderItemSerializer(serializers.ModelSerializer):
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source="product"
    )

    class Meta:
        model = OrderItem
        fields = [
            "product_id",
            "quantity",
            "price",
            "selected_color",
            "selected_size",
        ]

# Order Serializer
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, write_only=True)
    order_items = OrderItemSerializer(
        many=True,
        read_only=True,
        source="items"
    )

    class Meta:
        model = Order
        fields = [
            "id",
            "items",
            "order_items",
            "total_price",
            "status",
            "created_at",
        ]
        read_only_fields = ["total_price", "status", "created_at"]

    def create(self, validated_data):
        items_data = validated_data.pop("items")
        user = self.context["request"].user

        order = Order.objects.create(user=user)
        total_price = 0

        for item in items_data:
            item_total = item["price"] * item["quantity"]
            total_price += item_total

            OrderItem.objects.create(
                order=order,
                product=item["product"],
                quantity=item["quantity"],
                price=item["price"],
                selected_color=item.get("selected_color"),
                selected_size=item.get("selected_size"),
            )

        order.total_price = total_price
        order.save(update_fields=["total_price"])
        return order





# Signup Serializer
class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user
