from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('home', views.index, name='index'),
    path('index', views.index, name='index'),
    path('cluster', views.index, name='index'),
    path('unigene', views.index_unigene, name='index_unigene'),
    path('cluster/<str:cluster_id>/', views.cluster, name='cluster'),
    path('unigene/<str:unigene_id>/', views.unigene, name='unigene'),
    path('mgs_gene/<str:mgs_id>/', views.mgs_gene, name='mgs_gene'),
    path('metronic', views.metronic, name='metronic')
]
