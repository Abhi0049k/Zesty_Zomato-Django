from django.db import models

# Create your models here.
class Dish(models.Model):
    name = models.CharField(max_length=100)
    price = models.FloatField()
    quantity = models.IntegerField()
    

class Order(models.Model):
    customer = models.CharField(max_length=100)
    price = models.FloatField(default=0)
    item = models.CharField(max_length=100, default='item')

class TotalPrice(models.Model):
    total_sales = models.FloatField(default=0)