from django.contrib.auth.models import User
from rest_framework import serializers
from .models import BoardLayout

class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ['id', 'username', 'password']

class BoardSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = BoardLayout
        fields = ['layout', "name", "owner", "id"]