from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from . import views


urlpatterns = [
    path('create', views.create_customer),
    path('fetch',views.fetch_customer),
    path('fetch_single',views.fetch_single_customer),
    path('update',views.update),
    path('delete',views.delete)

    
]
