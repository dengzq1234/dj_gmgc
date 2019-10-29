from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('home', views.index, name='index'),
    path('index', views.index, name='index'),
    path('cluster/<str:cluster_id>/', views.cluster, name='cluster'),
    path('unigene/<str:unigene_id>/', views.unigene, name='unigene'),
]
