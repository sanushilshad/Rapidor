from django.db import models

# Create your models here.
class Order(models.Model):
    order_no = models.CharField(max_length=50, unique=True)
    customer_name = models.CharField(max_length=50)
    grand_total = models.FloatField(null=True)

    def __str__(self):
            return str(self.order_no) + "," + str(self.customer_name) + "," + str(self.grand_total)
    
    
        

class Order_line(models.Model):
    product_name = models.CharField(max_length=100)
    product_code = models.CharField(max_length=100)
    qty = models.FloatField()
    unit_price = models.FloatField()
    tax_rate = models.FloatField()
    order = models.ForeignKey(Order,on_delete=models.CASCADE)

    def __str__(self):
            return str(self.product_code) + "," + str(self.qty) + "," + str(self.order.order_no)
    
    

    
        