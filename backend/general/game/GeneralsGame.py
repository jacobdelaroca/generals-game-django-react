from pprint import pprint

board = [
    ['p p1', ' ', ' ', 'g3 p1', 'f p1', 'sg p1', ' ', ' ', ' '],
    ['g1 p1', 'g2 p1', 'sp p1', 'lc p1', 'p p1', 'l1 p1', 'sp p1', 'cp p1', 'm p1'],
    ['l2 p1', ' ', 'p p1', 'g4 p1', 'p p1', 'g5 p1', 'p p1', 'p p1', 'cl p1'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['g3 p2', ' ', ' ', 'p p2', 'lc p2', 'g5 p2', 'p p2', ' ', ' '],
    [' ', 'l1 p2', 'sp p2', 'cp p2', 'sg p2', 'p p2', ' ', 'g4 p2', 'sp p2'],
    ['l2 p2', 'm p2', 'cl p2', 'p p2', 'p p2', 'f p2', 'g1 p2', 'g2 p2', 'p p2'],
]

piece_ranks = {
    'sp'  : 16,
    'g5'  : 15,
    'g4'  : 14,
    'g3'  : 13,
    'g2'  : 12,
    'g1'  : 11,
    'bg'  : 10,
    'cl'  : 9,
    'lc'  : 8,
    'm'   : 7,
    'cp'  : 6,
    'l1'  : 5,
    'l2'  : 4,
    'sg'  : 3,
    'p'   : 2,
    'f'   : 1,
}

special_pieces = ['sp', 'p', 'f']



# pieces 
# gen 5 star x1       g5
# gen 4 star x1       g4
# gen 3 star x1       g3
# gen 2 star x1       g2
# gen 1 star x1       g1
# colonel x1          cl
# lt col x1           lc
# major x1            m
# captian x1          cp
# lt 1 x1             l1
# lt 2 x1             l2
# sergeant x1         sg
# private x6          p
# spy x2              sp
# flag x1             f

class Game():
    @staticmethod
    def move(board, player, move):
        # validate the move
        valid, error = Game.validate(board, player, move)
        if not valid:
            # handle error
            print('invalid', error)
            return None, None, None
        
        origin, to = move
        org_x, org_y = origin
        to_x, to_y = to

        # move piece after validation
        piece = board[org_x][org_y]
        board[org_x][org_y] = ' '

        result = {"winning_piece": None, "winning_player": None}
        winner = None
        flag_in_place = False

        # move into empty square
        if board[to_x][to_y] == ' ':
            piece_name, piece_player = piece.split(' ')
            if piece_name == "f":
                print("moving flag")
                if piece_player == "p1" and to_x == 0:
                    print("flag in position")
                    flag_in_place = True    
                if piece_player == "p2" and to_x == 7:
                    flag_in_place = True    
                    print("flag in position")
            board[to_x][to_y] = piece
        else:
            opponent_piece = board[to_x][to_y]
            winning_piece, winning_player, winner = Game.judge(piece, opponent_piece)
            result = {'winning_piece': winning_piece, 'winning_player': winning_player}
            # keep the winning piece
            board[to_x][to_y] = winning_piece
        
        pprint(board)

        return board, move, result, winner, flag_in_place

    @staticmethod
    def judge(challenger, opponent):
        challenger_piece, challenger_player = challenger.split(' ')
        opponent_piece, opponent_player = opponent.split(' ')

        if challenger_piece in special_pieces and opponent_piece in special_pieces:
            # flag challenge another flag
            if challenger_piece == 'f' and opponent_piece == 'f':
                # handle flag v flag
                return challenger, challenger_piece, challenger_player
            
            # flag vs special piece
            if challenger_piece == 'f' or opponent_piece == 'f':
                if opponent_piece == "f":
                    print("wiiner challenger")
                    return challenger, challenger_player, challenger_player
                if challenger_piece == "f":
                    print("wiiner challenged")
                    return opponent, opponent_player, opponent_player
                
            # spy challenged private or vice versa
            if not challenger_piece == opponent_piece:
                if challenger_piece == 'p':
                    return challenger, challenger_player, None
                else:
                    return opponent, opponent_player, None
            
            # same piece but not flags
            return ' ', None
        else:
            if opponent_piece == "f":
                print("wiiner challenger")
                return challenger, challenger_player, challenger_player
            if challenger_piece == "f":
                print("wiiner challenged")
                return opponent, opponent_player, opponent_player
            # challenger is higher ranked
            if piece_ranks[challenger_piece] > piece_ranks[opponent_piece]:
                return challenger, challenger_player, None
            # opponent is higher ranked
            elif piece_ranks[challenger_piece] < piece_ranks[opponent_piece]:
                return opponent, opponent_player, None
            # same rank both get removed
            else:
                return ' ', None


    
    @staticmethod
    def validate_layout(board):
        if len(board) != 3: return False
        for row in board: 
            if len(row) != 9: return False
        board_unfolded = [*board[0], *board[1], *board[2]]
        if board_unfolded.count("g5") != 1: return False
        if board_unfolded.count("g4") != 1: return False
        if board_unfolded.count("g3") != 1: return False
        if board_unfolded.count("g2") != 1: return False
        if board_unfolded.count("g1") != 1: return False
        if board_unfolded.count("cl") != 1: return False
        if board_unfolded.count("lc") != 1: return False
        if board_unfolded.count("m") != 1: return False
        if board_unfolded.count("cp") != 1: return False
        if board_unfolded.count("l1") != 1: return False
        if board_unfolded.count("l2") != 1: return False
        if board_unfolded.count("sg") != 1: return False
        if board_unfolded.count("p") != 6: return False
        if board_unfolded.count("sp") != 2: return False
        if board_unfolded.count("f") != 1: return False
        return True


    
    
    @staticmethod
    def validate(board, player, move):
        origin, to = move
        org_x, org_y = origin
        to_x, to_y = to

        try:
            # empty origin piece
            if board[org_x][org_y] == ' ':
                return False, 'no piece to move'

            # trying to move piece of oponent
            if not board[org_x][org_y].split(' ')[1] == player:
                print('wrong player', board[org_x][org_y])
                return False, 'wrong player'
            
            # moving into a square occupied by own piece
            if not board[to_x][to_y] == ' ' and board[to_x][to_y].split(' ')[1] == player:
                return False, 'already occupied'
            
            # try to move more than one square
            if abs(org_x - to_x) > 1 or abs(org_y - to_y) > 1:
                return False, 'one square at a time'
            
            # try to move diagonally
            if not abs(org_y - to_y) * abs(org_x - to_x) == 0:
                return False, 'cannot move diagonaly'
            
            # using negative indexing to "wrap" around the board 
            if org_x < 0 or org_y < 0 or to_x < 0 or to_y < 0:
                return False, 'cannot use negative indexing'
        
        # try to move outside of the board
        except IndexError:
            return False, 'move out of bounds'
        
        return True, 'move valid'
        
        



if __name__ == 'main':
    move = ([3, 0], [4, 0])
    move2 = ([6, 1], [5, 1])
    player = 'p1'
    player2 = 'p2'

    pprint(board)
    Game.move(board, player, move)
