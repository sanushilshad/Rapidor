from django.db import models

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=50)
    code = models.CharField(max_length=15)
    unit_price = models.FloatField()
    tax_percent = models.FloatField()