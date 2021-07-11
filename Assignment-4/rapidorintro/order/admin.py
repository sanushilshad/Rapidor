from django.contrib import admin

# Register your models here.
from .models import Order, Order_line

admin.site.register(Order)
admin.site.register(Order_line)

