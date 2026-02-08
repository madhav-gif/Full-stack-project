from django.contrib import admin
from .models import Product, Cart, Order, OrderItem, ProductImage, Wishlist


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 5


class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageInline]

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        form.base_fields["colors"].help_text = 'JSON format: ["Red", "Blue"]'
        form.base_fields["sizes"].help_text = 'JSON format: ["S", "M", "L"]'
        return form


class OrderAdmin(admin.ModelAdmin):
    readonly_fields = ('total_price', 'created_at')


admin.site.register(Product, ProductAdmin)
admin.site.register(Cart)
admin.site.register(Order, OrderAdmin)
admin.site.register(Wishlist)
admin.site.register(OrderItem)
