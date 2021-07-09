from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from . import views


urlpatterns = [
    path('create', views.create_product),
    path('fetch',views.fetch_product),
    path('fetch_single',views.fetch_single_product),
    path('update',views.update),
    path('delete',views.delete),
    path('',views.mains)

    
]
