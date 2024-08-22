from django.db import models
from django.contrib.auth.models import User

class GameRoomManeger(models.Manager):
    def initialize(self):
        pass

    def join(self, room, opponent):
        obj = self.get(room_name=room)
        if obj.opponent == None:
            obj.opponent = opponent
            obj.save()
            return True
        else:
            return False
        
    def clear(self, owner):
        obj = self.get(owner=owner)
        obj.opponent = None
        obj.save()

    def is_name_unique(self, name):
        if self.filter(room_name=name).exists():
            return False
        else:
            return True
    
    def set_name(self, owner, room_name):
        obj = self.get(owner=owner)
        obj.room_name = room_name
        obj.save()


    def init_board(self, room_name):
        obj = self.get(room_name=room_name)
        board = [] 
        host_layout_raw = obj.host_layout
        host_layout = []

        for row in host_layout_raw:
            new_row = []
            for item in row:
                if item == " ":
                    new_row.append(item)
                else:
                    new_row.append(item + " p1")
            host_layout.append(new_row)
        opp_layout_raw = obj.opponent_layout
        opp_layout = []

        for row in opp_layout_raw:
            new_row = []
            for item in row:
                if item == " ":
                    new_row.append(item)
                else:
                    new_row.append(item + " p2")
            opp_layout.append(new_row)
        opp_layout.reverse()
        opp_layout_reversed = [list(reversed(row)) for row in opp_layout]

        board.extend(opp_layout_reversed)
        board.append([' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']) 
        board.append([' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']) 
        board.extend(host_layout)
        
        obj.board = board
        obj.turn = obj.owner
        obj.save()




class GameRoom(models.Model):
    board = models.JSONField(null=True)
    host_layout = models.JSONField(null=True)
    opponent_layout = models.JSONField(null=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owner')
    room_name = models.CharField(max_length=100, null=True)
    host_ready = models.BooleanField(default=False)
    opponent_ready = models.BooleanField(default=False)
    opponent = models.ForeignKey(User, on_delete=models.CASCADE, related_name='opponent', null=True)
    turn = models.ForeignKey(User, on_delete=models.CASCADE, related_name='turn', null=True)
    
    objects = GameRoomManeger()

class BoardLayout(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    layout = models.JSONField(null=True)
    name = models.CharField(max_length=100, null=True)

