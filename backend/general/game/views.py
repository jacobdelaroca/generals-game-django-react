from django.shortcuts import render
from django.views.generic import View
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .serializers import UserSerializer, BoardSerializer
from .models import GameRoom, BoardLayout
import json
from .GeneralsGame import Game
from django.contrib.auth import authenticate, login
import traceback
import copy

# Create your views here.
# intents
IS_GAME_STARTED = "isStarted"
TURN_UPDATE = "turnUpdate"
INITIAL = "initial"

class GameView(View):
    def get(self, request):
        return render(request, 'game/base.html')


class Test(APIView):
    def get(self, request):
        return Response("eyyyy", status=status.HTTP_200_OK)
    
class JoinGameView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        body = request.data
        try:
            room_name = body['room_name']
            joined = GameRoom.objects.join(room_name, request.user)
            if joined:
                return Response({"room_name": room_name}, status=status.HTTP_202_ACCEPTED)
            else:
                return Response({"error": "unable to join"} ,status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class GetUpdate(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            room_name = request.GET.get("room_name", "")
            intent = request.GET.get("intent", "")
            room = GameRoom.objects.get(room_name=room_name)
            winner = None
            if room.winner is not None:
                winner = room.winner == request.user
            player = "p1" if room.owner == request.user else "p2"
            if room.owner != request.user and room.opponent != request.user:
                return Response({"error": "unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
            
            if intent == IS_GAME_STARTED:
                if room.host_ready and room.opponent_ready:
                    isTurn = room.turn == request.user
                    return Response({"started": True, "turn": isTurn}, status=status.HTTP_200_OK)
                else:
                    return Response({"started": False}, status=status.HTTP_200_OK)
            elif intent == TURN_UPDATE:
                print("update winner", winner)
                is_player_turn = room.turn == request.user
                if is_player_turn:
                    return Response({"turn": is_player_turn, "winner": winner, "board": room.prep_board_before_sending(player), "move": room.new_move}, status=status.HTTP_200_OK)    
                else:
                    return Response({"turn": is_player_turn, "winner": winner}, status=status.HTTP_200_OK)    
            elif intent == INITIAL:
                preped_board = room.prep_board_before_sending(player)
                return Response({"turn": room.turn == request.user, "player": player, "board": preped_board}, status=status.HTTP_200_OK)    

            else:
                return Response({"error": "nor found"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            traceback.print_exc()
            return Response({"error": e}, status=status.HTTP_400_BAD_REQUEST)



class MoveView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        body = request.data
        print(request.data)
        try:
            room_name = body["room_name"]
            move = body["move"]
            room = GameRoom.objects.get(room_name=room_name)

            if room.turn != request.user:
                return Response({"error": "not your turn"}, status=status.HTTP_403_FORBIDDEN)

            player = "p1" if room.owner == request.user else "p2"

            if room.owner == request.user:
                if room.opponent_flag_in_place:
                    print("confirmed in place")
                    room.winner = room.opponent
                    room.save()
                    return Response({"board": [], "move": [], "result": [], "turn": room.turn == request.user, "winner":False}, status=status.HTTP_202_ACCEPTED)
            else:
                if room.owner_flag_in_place:
                    print("confirmed in place")
                    room.winner = room.owner
                    room.save()
                    return Response({"board": [], "move": [], "result": [], "turn": room.turn == request.user, "winner":False}, status=status.HTTP_202_ACCEPTED)
                    
            new_board, move, result, winner, flag_in_place = Game.move(room.board, player, move)
            print("return from move, flag in position: ", flag_in_place)
            if winner is not None: winner = winner == player
            if new_board is not None:
                if room.turn == room.owner:
                    room.owner_flag_in_place = flag_in_place
                    room.turn = room.opponent
                else:
                    room.opponent_flag_in_place = flag_in_place
                    room.turn = room.owner
                room.board = new_board
                room.new_move = move
                if winner is not None:
                    if winner == player:
                        room.winner = request.user
                    else:
                        room.winner = room.opponent if request.user != room.owner else room.owner 
                room.save()
            else:
                print("here")
                return Response({"board": new_board, "move": move}, status=status.HTTP_400_BAD_REQUEST)
            # return board without hrevealing opponent position
            board_copy = room.prep_board_before_sending(player)
            print("winner", winner)
            return Response({"board": board_copy, "move": move, "result": result, "turn": room.turn == request.user, "winner":winner}, status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            traceback.print_exc()
            print("here")
            return Response(status=status.HTTP_400_BAD_REQUEST)


        
    
class PlayerReadyView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        body = request.data
        try:
            room_name = body['room_name']
            layout_id = body['layout']
            room = GameRoom.objects.get(room_name=room_name)
            board = BoardLayout.objects.get(pk=layout_id)
            if board.owner != request.user: 
                return Response({"error": "not your board"}, status=status.HTTP_403_FORBIDDEN)
            layout = board.layout
            if request.user == room.owner:
                room.host_layout = layout
                room.host_ready = True
                room.save()
                if room.opponent_layout is not None:
                    GameRoom.objects.init_board(room_name)
            elif request.user == room.opponent:
                room.opponent_layout = layout
                room.opponent_ready = True
                room.save()
                if room.host_layout is not None:
                    GameRoom.objects.init_board(room_name)
            else:
                return Response({"error": "Room not joined"}, status=status.HTTP_401_UNAUTHORIZED)
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)
    
class GetBoardsView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        boards = BoardLayout.objects.filter(owner=request.user)
        serializer = BoardSerializer(boards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AddBoardView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        body = request.data
        try:
            layout = body['layout']
            name = body['name']
            new_board = BoardLayout(owner=request.user, layout=layout, name=name)
            new_board.save()
            return Response({"message": "created"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)

class CreateRoom(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        body = request.data
        try:
            room_name = body['room_name']
            if GameRoom.objects.is_name_unique(room_name, request.user):
                GameRoom.objects.clear(request.user)
                GameRoom.objects.set_name(request.user, room_name)
                return Response({"room_name": room_name}, status=status.HTTP_200_OK)
            else:
                print("room with same name handle later")
                return Response({"error": "room with same name handle later"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            traceback.print_exc()
            return Response(status=status.HTTP_400_BAD_REQUEST)




class SignupView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(username=request.data['username'])
            user.set_password(request.data['password'])
            user.save()
            token = Token.objects.create(user=user)
            new_room = GameRoom(owner=user)
            new_room.save()
            return Response({"token": token.key}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
    def post(self, request):
        user = get_object_or_404(User, username=request.data['username'])
        if not user.check_password(request.data['password']):
            return Response('Incorrext username or password', status=status.HTTP_200_OK)

        token, c = Token.objects.get_or_create(user=user)
        serializer = UserSerializer(user)
        username = request.data['username']
        password = request.data['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
        return Response({"token": token.key, "user":serializer.data['username']})

class LogOutView(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
            token_db = Token.objects.get(key=token)
            token_db.delete()
            return Response(status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)