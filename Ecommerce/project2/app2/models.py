from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from cloudinary.models import CloudinaryField



# ===================== PRODUCT =====================
class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    price = models.DecimalField(max_digits=10, decimal_places=2)

    # For serializers: ListField (colors, sizes)
    colors = models.JSONField(blank=True, null=True)
    sizes = models.JSONField(blank=True, null=True)

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


# ===================== PRODUCT IMAGE =====================
class ProductImage(models.Model):
    product = models.ForeignKey(
        Product,
        related_name="images",
        on_delete=models.CASCADE
    )
    image = CloudinaryField('product_image')

    def __str__(self):
        return f"Image of {self.product.name}"


# CART 
class Cart(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="cart_items"
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    quantity = models.PositiveIntegerField(default=1)

    selected_color = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )
    selected_size = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    # serializer field: added_at
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = (
            "user",
            "product",
            "selected_color",
            "selected_size"
        )

    def __str__(self):
        return f"{self.user.username} - {self.product.name}"


# ===================== ORDER =====================
class Order(models.Model):

    STATUS_CHOICES = (
        ("Pending", "Pending"),
        ("Confirmed", "Confirmed"),
        ("Shipped", "Shipped"),
        ("Delivered", "Delivered"),
    )

    PAYMENT_STATUS_CHOICES = (
        ("PENDING", "PENDING"),
        ("SUCCESS", "SUCCESS"),
        ("FAILED", "FAILED"),
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="orders"
    )

    total_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Pending"
    )

    payment_status = models.CharField(
        max_length=20,
        choices=PAYMENT_STATUS_CHOICES,
        default="PENDING"
    )

    # Razorpay fields (used in views)
    razorpay_order_id = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )
    razorpay_payment_id = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )
    razorpay_signature = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order #{self.id}"


# ===================== ORDER ITEM =====================
class OrderItem(models.Model):
    order = models.ForeignKey(
        Order,
        related_name="items",
        on_delete=models.CASCADE
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    selected_color = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )
    selected_size = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    def __str__(self):
        return f"{self.product.name} ({self.quantity})"


# ===================== WISHLIST =====================
class Wishlist(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="wishlist_items"
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    created_at = models.DateTimeField(default=timezone.now  )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("user", "product")

    def __str__(self):
        return f"{self.user.username} - {self.product.name}"
