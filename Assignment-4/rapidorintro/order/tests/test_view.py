from django.test import TestCase, client
from django.test import Client
from django.urls import reverse

class Testviews(TestCase):
    
    def test_create_order_invalid_products(self):
        file_1 = open("./json_request/order_create.json", "r")
        order_request_1=file_1.read()
        print(order_request_1)
        url = reverse('create_order')
        client = Client()
        response = client.post(url, order_request_1, content_type="application/json")
        print(response.content)
        self.assertEquals(response.status_code, 200)
        print(response.content)
        self.assertJSONEqual(str(response.content),{"message": "Customer ABC does not exist", "status": False})
    
        

