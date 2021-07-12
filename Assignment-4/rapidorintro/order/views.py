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
    product_codes = list(map(lambda line: line['code'], lines))
    # product_codes = filter(lambda line: line['code'] == "AQ-60", lines)

    print(product_codes)
    product_values = list(Product.objects.filter(code__in=product_codes).values('code'))
    print(product_values)
    product_exist = list(map(lambda product: product['code'], product_values))
    
    for product_code in product_codes:
        if product_code not in product_exist:
            product_not_exist.append(product_code)



    
    if not product_not_exist:
        order1 = Order()
        order1.customer_name = json_body['customer_name']
        order1.grand_total = calculate_totals(lines)['grand_total']
        order1.order_no = order_number_generation()
        order1.save()
        lines = json_body['lines']
        # for line in lines:
        #     order_line = Order_line()
        #     order_line.product_name = line['name']
        #     order_line.product_code = line['code']
        #     order_line.unit_price = line['unit_price']
        #     order_line.qty = line['qty']
        #     order_line.tax_rate = line['tax_rate']
        #     order_line.order = order1
        #     order_line.save()
        
        # for line in lines:
        #     Order_line.objects.bulk_create([
        #     Order_line(product_name= line['name'], product_code=line['code'], 
        #         unit_price=line['unit_price'],qty=line['qty'],tax_rate=line['tax_rate'],order=order1),
        #     ])

        def map_to_orderline(line):
           return Order_line(product_name=line['name'],
                             product_code=line['code'], 
                             unit_price=line['unit_price'],
                             qty=line['qty'],
                             tax_rate=line['tax_rate'],
                             order=order1
                            )

        bulk_entry = list((map(lambda line: map_to_orderline(line), lines)))
        Order_line.objects.bulk_create(bulk_entry)

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