from django.urls import path
from django.http import HttpResponse

app_name = 'home'
urlpatterns = [
    path('', lambda a: HttpResponse('home'), name='home'),
]