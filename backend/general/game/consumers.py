from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
import json
from .models import *

class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.game = await self.get_game()
        user = self.scope['user']
        self.room_name = self.scope['url_route']['kwargs']['game_name']
        
        
        await self.accept()


        await self.send(text_data=json.dumps({
            'type': 'initialize',
            'room_name': self.game_name
        }))
    
    async def receive(self, text_data=None, bytes_data=None):
        print(json.loads(text_data))

    @database_sync_to_async
    def get_game(self):
        return GameRoom.objects.get(room_name=self.room_name)