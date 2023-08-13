from django.urls import path
from .views import *

urlpatterns = [
    path('', home, name='home'),
    path('allDishes/', GetDishesView.as_view(), name='allDishes'),
    path('allOrders/', GetOrdersView.as_view(), name='allOrders'),
    path('addDish/', addDish, name='addDish'),
    path('placeOrder/', addOrder, name='addDish'),
    path('deleteOrder/<id>/', deleteOrder, name='deleteOrder'),
    path('deleteDish/<id>/', deleteDish, name='deleteDish'),
    path('totalSales/', GetTotalPriceView.as_view(), name='totalSales')
]