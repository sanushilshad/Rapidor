from django.shortcuts import render
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from .models import Order, Order_line
from product.models import Product
import string    
import random


# Create your views here.
@csrf_exempt
def order(request):
    body = request.body
    json_body = json.loads(body)

    lines=json_body['lines']
    product_not_exist = []
    
    for line in lines:
        exist_product = Product.objects.filter(code=line['code']).exists()
        if (exist_product == False):
            product_not_exist.append(line['code'])
    
    if not product_not_exist:
        order1 = Order()
        order1.customer_name = json_body['customer_name']
        order1.grand_total = calculate_totals(lines)['grand_total']
        exist_orderno = True
        while(exist_orderno == True):
            order_no1 = order_number_generation()
            exist_orderno = Order.objects.filter(order_no=order_no1).exists()
            if (exist_orderno == False):
                order1.order_no = order_number_generation()
                
        
        order1.save()
        lines = json_body['lines']
        for line in lines:
            order_line = Order_line()
            order_line.product_name = line['name']
            order_line.product_code = line['code']
            order_line.unit_price = line['unit_price']
            order_line.qty = line['qty']
            order_line.tax_rate = line['tax_rate']
            order_line.order = order1
            order_line.save()
        return JsonResponse({
            "message": "Order has been created successfully with: "+order1.order_no,
            "grand_total":order1.grand_total
        })

    else:
        if len(product_not_exist)==1:
            return JsonResponse({
                "message":"Product " + ' , '.join(product_not_exist) + " does not exist",
            })

        else:
            return JsonResponse({
                "message":"Products "+ ' , '.join(product_not_exist) + " does not exist",
            })

        
    
#     return JsonResponse({
#   "message": "Order has been created successfully with order_no: ORD00001",
#   "grand_total": 55300.00}, safe=False)
    # print(json_body)



def calculate_totals(lines):
    output = {}
    grand_total = 0
    all_line_total = []

    for line in lines:
        line_total_dict = {}
        code = line['code']
        unit_price = line['unit_price']
        qty = line['qty']
        tax_rate = line['tax_rate']
        price_without_tax = (qty*unit_price)
        line_total = price_without_tax+(price_without_tax*(tax_rate/100))
        grand_total = grand_total+line_total
        line_total_dict["code"] = code
        line_total_dict["line_total"] = line_total
        all_line_total.append(line_total_dict)

    output['grand_total'] = grand_total
    output['lines'] = all_line_total
    return output


def order_number_generation():     
    order_no = "ORD" + ''.join(random.choices(string.digits, k=4))  
    return order_no