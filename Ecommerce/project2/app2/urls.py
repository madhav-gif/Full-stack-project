from rest_framework.routers import DefaultRouter
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from app2.views import home

from .views import (
    ProductViewSet,
    SignupView,
    LoginView,
    CartViewSet,
    OrderViewSet,
    WishlistViewSet,
    create_razorpay_order,
    verify_payment,
)

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'carts', CartViewSet, basename='cart')
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'wishlist', WishlistViewSet, basename='wishlist')

urlpatterns = [

    #  API routes
    path("", include(router.urls)),

    #  Auth
    path("signup/", SignupView.as_view(), name="signup"),
    path("login/", LoginView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # Razorpay
    path("create-razorpay-order/", create_razorpay_order),
    path("verify-payment/", verify_payment),
]
