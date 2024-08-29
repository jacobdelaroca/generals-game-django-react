from django.db import models
from django.contrib.auth.models import User
import copy


# TODO move methods to model class and update usage
class GameRoomManeger(models.Manager):
    def initialize(self):
        pass

    def is_name_unique(self, name, owner):
        if self.filter(room_name=name).exclude(owner=owner).exists():
            return False
        else:
            return True
    



class GameRoom(models.Model):
    board = models.JSONField(null=True)
    new_move = models.JSONField(null=True)
    host_layout = models.JSONField(null=True)
    opponent_layout = models.JSONField(null=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owner')
    room_name = models.CharField(max_length=100, null=True)
    host_ready = models.BooleanField(default=False)
    opponent_ready = models.BooleanField(default=False)
    opponent = models.ForeignKey(User, on_delete=models.CASCADE, related_name='opponent', null=True)
    turn = models.ForeignKey(User, on_delete=models.CASCADE, related_name='turn', null=True)
    winner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='winner', null=True)
    owner_flag_in_place = models.BooleanField(default=False)
    opponent_flag_in_place = models.BooleanField(default=False)
    objects = GameRoomManeger()

    def prep_board_before_sending(self, player):
        board_copy = copy.deepcopy(self.board)
        for i in range(len(board_copy)):
            for j in range(len(board_copy[i])):
                if player == "p1" and "p2" in board_copy[i][j]:
                    board_copy[i][j] = self.board[i][j].split(" ")[1]
                elif player == "p2" and "p1" in board_copy[i][j]:
                    board_copy[i][j] = self.board[i][j].split(" ")[1]
        return board_copy

    def join(self, opponent):
        if self.opponent == None or self.opponent == opponent:
            self.opponent = opponent
            self.save()
            return True
        else:
            return False
    
    def clear(self):
        self.opponent = None
        self.turn = None
        self.room_name = None
        self.host_ready = False
        self.opponent_ready = False
        self.host_layout = None
        self.opponent_layout = None
        self.winner = None
        self.owner_flag_in_place = False
        self.opponent_flag_in_place = False
        self.save()

    def set_name(self, room_name):
        self.room_name = room_name
        self.save()

    def init_board(self):
        board = [] 
        host_layout_raw = self.host_layout
        host_layout = []

        for row in host_layout_raw:
            new_row = []
            for item in row:
                if item == " ":
                    new_row.append(item)
                else:
                    new_row.append(item + " p1")
            host_layout.append(new_row)
        opp_layout_raw = self.opponent_layout
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
        
        self.board = board
        self.turn = self.owner
        self.save()

class BoardLayout(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    layout = models.JSONField(null=True)
    name = models.CharField(max_length=100, null=True)

