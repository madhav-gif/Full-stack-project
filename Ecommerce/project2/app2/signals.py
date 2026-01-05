# from django.db.models.signals import pre_save,post_save,pre_delete,post_delete,pre_init,post_init,class_prepared

# from django.dispatch import receiver
# from .models import Product

# @receiver(pre_save, sender=Product)
# def product_pre_save(sender ,instance, **kwargs):
#     print("product table called", instance.pk)

# @receiver(post_save, sender=Product)
# def product_post_save(sender,created ,instance, **kwargs):
#     if created:
#         print("product ad hone k baad", instance.pk, instance.name, instance.price, instance.description)
#     else:
#         print("product update hone k baad", instance.pk, instance.name, instance.price, instance.description)



# @receiver(pre_delete, sender=Product)
# def product_pre_delete(sender ,instance, **kwargs):
#     print("product is about to be delete")

# @receiver(post_delete, sender=Product)
# def product_post_delete(sender ,instance, **kwargs):
#     print("product is deleted now")



# # @receiver(pre_init, sender=Product)
# # def product_pre_init(sender, **kwargs):
# #     print("product will be initialize")

# # @receiver(post_init, sender=Product)
# # def product_post_init(sender, **kwargs):
# #     print("product initialize")

# from django.core.signals import request_finished, request_started

# @receiver(request_started)
# def before_request(sender, **kwargs):
#     print("request started")

# @receiver(request_finished)
# def after_request(sender, **kwargs):
#     print("request finished")

# @receiver(class_prepared)
# def class_request(sender, **kwargs):
#     print("class finished", sender.__name__, sender)

