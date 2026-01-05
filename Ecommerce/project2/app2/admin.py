from django.contrib import admin
from .models import Product, Cart, Order,OrderItem, ProductImage,Wishlist

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 5

class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageInline]
class OrderAdmin(admin.ModelAdmin):
    readonly_fields =('total_price','created_at')    


admin.site.register(Product, ProductAdmin) 
admin.site.register(Cart)
admin.site.register(Order,OrderAdmin)
admin.site.register(ProductImage)
admin.site.register(Wishlist)
admin.site.register(OrderItem)