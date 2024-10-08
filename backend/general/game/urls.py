from django.urls import path
from .views import *

app_name = 'game'

urlpatterns = [
    path('', GameView.as_view(), name='game'),
    path('test/', Test.as_view(), name='test'),
    path('join/', JoinGameView.as_view(), name='join'),
    path('create-room/', CreateRoom.as_view(), name='create-room'),
    path('add-board/', AddBoardView.as_view(), name='add-board'),
    path('add-board/<int:pk>/', AddBoardView.as_view(), name='add-board-update'),
    path('my-boards/', GetBoardsView.as_view(), name='get-board'),
    path('ready/', PlayerReadyView.as_view(), name='ready'),
    path('move/', MoveView.as_view(), name='move'),
    path('surrender/', SurrenderView.as_view(), name='surrender'),
    path('update/', GetUpdate.as_view(), name='update'),
]
