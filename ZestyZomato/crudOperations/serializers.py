from rest_framework import serializers
from .models import *

class DishSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Dish
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class TotalPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = TotalPrice
        fields = '__all__'