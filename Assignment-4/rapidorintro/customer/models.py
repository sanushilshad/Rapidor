from django.db import models

# Create your models here.

class Customer(models.Model):
    name=models.CharField(max_length=50)
    mobile=models.CharField(max_length=20)
    username=models.CharField(max_length=20,unique=True)





