from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r"ws/generals/game/(?P<game_name>\w+)/$", consumers.GameConsumer.as_asgi()),
]