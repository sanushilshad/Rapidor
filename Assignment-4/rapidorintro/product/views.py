from django.shortcuts import render
from django.http import HttpResponse, response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Product

# Create your views here.
@csrf_exempt
def create_product(request):
    body = request.body
    json_body = json.loads(body)
    product_1 = Product()
    product_1.name = json_body['name']
    product_1.code = json_body['code']
    product_1.unit_price = json_body['unit_price']
    product_1.tax_percent = json_body['tax_percent']
    product_1.save()
    response = {
        'message' :"You have successfully created new customer: " + product_1.name
    }
    return JsonResponse(response)


@csrf_exempt
def fetch_product(request):
    response = {}
    product_list = []
    products = Product.objects.all().order_by('id')

    for product in products:
        print(product.mobile)
        product_list.append({
            'name': product.name,
            'code': product.code,
            'unit_price': product.unit_price,
            'tax_percent': product.tax_percent
        })
    return JsonResponse(product_list, safe=False)


@csrf_exempt
def fetch_single_product(request):
    body = request.body
    json_body = json.loads(body)
    id_1 = json_body['id']
    print(json_body)
    response = {}
    product_list = []
    products = Product.objects.filter(id=id_1)
    print(products)

    for i in products:
        response = {
            'name': i.name,
            'code': i.code,
            'unit_price': i.unit_price,
            'tax_percent': i.tax_percent
        }
        print("RR", response)
    #customers=Customer.objects.get(id=id_1)
    #response={'name':customers.name,'mobile':customers.mobile,'id':customers.id}
    # return JsonResponse(customer_list,safe=False)
    return JsonResponse(response, safe=False)


@csrf_exempt
def update(request):
    body = request.body
    json_body = json.loads(body)
    id_1= json_body['id']
    name_1 = json_body['name']
    code_1 = json_body['code']
    unit_price_1 = json_body['unit_price']
    tax_percent_1 = json_body['tax_percent']
    #Customer.objects.filter(id=1).update(name=name_1,mobile=mobile_1)
    exist = Product.objects.filter(id=id_1).exists()
    print(exist)
    if (exist):
        product = Product.objects.get(id=id_1)
        product.name = name_1
        product.code = code_1
        product.unit_price=unit_price_1
        product.tax_percent=tax_percent_1
        product.save()
        return JsonResponse('Successfully updated', safe=False)
    else:
        return JsonResponse({
            "message": "Invalid Customer ID"
        })


@csrf_exempt
def delete(request):
    body = request.body
    print(body)
    json_body = json.loads(body)
    id_1 = json_body['id']
    exist = Product.objects.filter(id=id_1).exists()
    print(exist)

    if (exist):
        customer = Product.objects.get(id = id_1)
        customer.delete()
        return JsonResponse('Successfully deleted', safe=False)
    else:
        return JsonResponse({
            "message": "Invalid Customer ID"
        })


def mains(request):
    products=Product.objects.all().order_by('id')
    # return JsonResponse('main.html',customers,safe=False)
    return render (request,'product\main.html', {'products': products})

# # @csrf_exempt
# # def create_cust(request):
# #     if request.method == 'POST':  # data sent by user
# #         form = Customer(request.POST)
# #         print(form)
# #         if form.is_valid():
# #             form.save()  # this will save Car info to database
# #             return HttpResponse('Car added to database')
# #     else:  # display empty form
# #         form = Customer()

#     customers=Customer.objects.all().order_by('id')
#     print(customers)
#     return render(request, 'main.html', {'articles': form})

    
    
    





