from django.shortcuts import render, get_object_or_404
from django.core import serializers
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json
from .models import *
from .serializers import *
# Create your views here.

def home(request):
    return JsonResponse({'msg': 'Welcome to Zesty Zomato\'s backend'})

class GetDishesView(APIView):
    def get(self, request):
        dishes = Dish.objects.all()
        serializer = DishSerializer(dishes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class GetOrdersView(APIView):
    def get(self, request):
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class GetTotalPriceView(APIView):
    def get(self, request):
        earning = TotalPrice.objects.all()
        serializer = TotalPriceSerializer(earning, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

def update_total_price(new_price):
    try:
        total_price_obj = TotalPrice.objects.first()
        if total_price_obj:
            total_price_obj.total_sales += new_price
            total_price_obj.save()
        else:
            TotalPrice.objects.create(total_sales = new_price)
    except Exception as e:
        print(f'Error updating total price: {str(e)}')

def reduce_dish_quantity(item):
    try:
        dish = Dish.objects.get(name=item)
        if(dish.quantity > 0):
            dish.quantity -= 1
            dish.save()
    except Dish.DoesNotExist:
        print(f'{item} does not exist')
    except Exception as e:
        print(f'Error reducing dish quantity: {str(e)}')

@csrf_exempt
def addOrder(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            serializer = OrderSerializer(data=data)
            if serializer.is_valid():
                order = serializer.save() 
                price = order.price
                update_total_price(price)
                item = order.item
                reduce_dish_quantity(item)
                return JsonResponse({'msg': 'Order Placed'}, status=200)
            else:
                return JsonResponse(serializer.errors, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'msg': 'Invalid JSON data'}, status=400)
    else:
        return JsonResponse({'msg': 'This Route is only for placing orders'})

@csrf_exempt
def deleteOrder(request, id):
    if request.method == 'DELETE':
        try:
            order = get_object_or_404(Order, id=id)
            order.delete()
            return JsonResponse({'msg': f'Order with Id {id} deleted'}, status=200)
        except Exception as e:
            return JsonResponse({'msg': f'Error deleting order: {str(e)}'}, status=500)
    else:
        return JsonResponse({'msg': 'This Route is only for deleting orders'})
    
@csrf_exempt
def deleteDish(request, id):
    if request.method == 'DELETE':
        try:
            dish = get_object_or_404(Dish, id=id)
            dish.delete()
            return JsonResponse({'msg': f'Dish with Id {id} deleted'}, status=200)
        except Exception as e:
            return JsonResponse({'msg': f'Error deleting order: {str(e)}'}, status=500)
    else:
        return JsonResponse({'msg': 'This Route is only for deleting dishes'})

@csrf_exempt
def addDish(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            serializer = DishSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({'msg': 'Dish Added'}, status=200)
            else:
                return JsonResponse(serializer.errors, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'msg': 'Invalid JSON data'}, status=400)
    else:
        return JsonResponse({'msg': 'This Route is only for POST request'}, status=400)
