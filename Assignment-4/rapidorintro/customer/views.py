from django.shortcuts import render
from django.http import HttpResponse, response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Customer

# Create your views here.
@csrf_exempt
def create_customer(request):
    body = request.body
    json_body = json.loads(body)
    cust_1 = Customer()
    cust_1.name = json_body['name']
    cust_1.mobile = json_body['mobile']
    cust_1.save()
    response = {
        'message' :"You have successfully created new customer: " + cust_1.name
    }
    return JsonResponse(response)


@csrf_exempt
def fetch_customer(request):
    response = {}
    customer_list = []
    customers = Customer.objects.all().order_by('id')

    for customer in customers:
        print(customer.mobile)
        customer_list.append({
            'id': customer.id,
            'name': customer.name,
            'mobile': customer.mobile
        })
    return JsonResponse(customer_list, safe=False)


@csrf_exempt
def fetch_single_customer(request):
    body = request.body
    json_body = json.loads(body)
    id_1 = json_body['id']
    print(json_body)
    response = {}
    customer_list = []
    customers = Customer.objects.filter(id=id_1)
    print(customers)

    for i in customers:
        response = {
            'name': i.name,
            'mobile': i.mobile,
            'id': i.id
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
    id_1 = json_body['id']
    name_1 = json_body['name']
    mobile_1 = json_body['mobile']
    #Customer.objects.filter(id=1).update(name=name_1,mobile=mobile_1)
    exist = Customer.objects.filter(id=id_1).exists()
    print(exist)
    if (exist):
        customer = Customer.objects.get(id=id_1)
        customer.name = name_1
        customer.mobile = mobile_1
        customer.save()
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
    exist = Customer.objects.filter(id=id_1).exists()
    print(exist)

    if (exist):
        customer = Customer.objects.get(id = id_1)
        customer.delete()
        return JsonResponse('Successfully deleted', safe=False)
    else:
        return JsonResponse({
            "message": "Invalid Customer ID"
        })


def mains(request):
    customers=Customer.objects.all().order_by('id')
    # return JsonResponse('main.html',customers,safe=False)
    return render (request,'main.html', {'customers': customers})

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

    
    
    





