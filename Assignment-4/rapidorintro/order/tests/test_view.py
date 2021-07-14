from os import name
from django.test import TestCase, client
from django.test import Client
from django.urls import reverse
from customer.models import Customer
from product.models import Product
class Testviews(TestCase):
    
    def test_create_order_invalid_customer(self):
        file_1 = open("./json_request/order_create.json", "r")
        order_request_1=file_1.read()
        url = reverse('create_order')
        client = Client()
        response = client.post(url, order_request_1, content_type="application/json")
        self.assertEquals(response.status_code, 200)
        self.assertJSONEqual(str(response.content,encoding='utf-8'), {"message": "Customer ABC does not exist", "status": False})

    def test_create_order_invalid_products(self):
        customer1=Customer(name='sanu',username='ABC')
        customer1.save()
        file_1 = open("./json_request/order_create.json", "r")
        order_request_1=file_1.read()
        url = reverse('create_order')
        client = Client()
        response = client.post(url, order_request_1, content_type="application/json")
        self.assertEquals(response.status_code, 200)
        self.assertJSONEqual(str(response.content,encoding='utf-8'), {'message': 'Products AQ-60, XI-M2 does not exist', 'status': False})


    def test_create_order_success(self):
        customer1=Customer(name='sanu',username='ABC')
        customer1.save()
        Product.objects.create(name='a', code='XI-M2', tax_percent=2, unit_price=100)
        Product.objects.create(name='a', code='AQ-60', tax_percent=2, unit_price=100)
        file_1 = open("./json_request/order_create.json", "r")
        order_request_1=file_1.read()
        url = reverse('create_order')
        client = Client()
        response = client.post(url, order_request_1, content_type="application/json")
        self.assertEquals(response.status_code, 200)
        self.assertJSONEqual(str(response.content,encoding='utf-8'), {'message': 'Order has been created successfully with: ','grand_total': 32900.0})
        
    
        


        

