// to do
// make it so that only your pieces are allowed to display their move
// redraw the board from an array



var draggableElement = document.getElementById('drag');
var isDragging = false;
var offsetX, offsetY;
let elementToMove = null
const player = 'p1';
const opponent = 'p2';

let wsLoc = 'ws://'
            + window.location.host
            + '/ws/generals/game/'
            + 'testname'
            + '/'
console.log(wsLoc)
const gameSocket = new WebSocket(wsLoc);


const boardOrig = [
    [' ', ' ', ' ', 'g3 p1', 'f p1', 'sg p1', ' ', ' ', ' '],
    ['g1 p1', 'g2 p1', 'sp p1', 'lc p1', 'p p1', 'l1 p1', 'sp p1', 'cp p1', 'm p1'],
    ['l2 p1', ' ', 'p p1', ' ', 'p p1', 'g5 p1', 'p p1', 'p p1', 'cl p1'],
    ['p p1', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', 'g4 p1', ' ', ' ', ' '],
    ['p2', ' ', ' ', 'p2', 'p2', 'p2', 'p2', ' ', ' '],
    [' ', 'p2', 'p2', 'p2', 'p2', 'p2', ' ', 'p2', 'p2'],
    ['p2', 'p2', 'p2', 'p2', 'p2', 'p2', 'p2', 'p2', 'p2'],
]

const rows = player === 'p1'? ['1', '2', '3', '4', '5', '6', '7', '8'].reverse():['1', '2', '3', '4', '5', '6', '7', '8'];
const cols = player === 'p1'? ['1', '2', '3', '4', '5', '6', '7', '8', '9'].reverse():['1', '2', '3', '4', '5', '6', '7', '8', '9'];

let move = [];

const boardPieces = boardOrig.map(row => row.reverse()).reverse();

console.log(draggableElement);
console.log(draggableElement.textContent);

draggableElement.addEventListener('mousedown', function (e) {
    isDragging = true;
    offsetX = e.clientX - draggableElement.getBoundingClientRect().left;
    offsetY = e.clientY - draggableElement.getBoundingClientRect().top;
    draggableElement.style.position = 'absolute'
    elementToMove = draggableElement.cloneNode(true);
});

draggableElement.addEventListener('mouseup', function (e) {
    isDragging = false;
    draggableElement.style.left = '0px';
    draggableElement.style.top =  '0px';
    draggableElement.style.position = 'relative';
});

draggableElement.addEventListener('click', e => {
    gameSocket.send(JSON.stringify({
        'data': 'sent data'
    }))
})


document.addEventListener('mousemove', function (e) {
    if (isDragging) {
        var x = e.clientX - offsetX;
        var y = e.clientY - offsetY;

        draggableElement.style.left = x + 'px';
        draggableElement.style.top = y + 'px';
    }
});

document.addEventListener('mouseup', function () {
    isDragging = false;
});

// draw the board and put unique ids for all the tiles
const drawBoard = () =>{
    const boardArea = document.getElementById('board-area');
    rows.forEach(row => {
        const newRow = document.createElement('div');
        newRow.classList.add('board-row');
        newRow.classList.add('row');
        cols.forEach(col => {
            newRow.innerHTML += `
            <div class="tile" id="${row+col}"></div>
            `;
        });
        boardArea.appendChild(newRow);
    });
};
// array of all the tile element 
const board = [];
const loadTiles = () => {
    rows.forEach(row => {
        const elRow = [];
        cols.forEach(col => {
            const tile = document.getElementById(`${row+col}`);
            elRow.push(tile);
        });
        board.push(elRow);
    });

};
drawBoard();
loadTiles();

// attach event listener to all the tiles
board.forEach((row, i) => {
    row.forEach((tile, j) => {
        tile.addEventListener('click', e => {
            if(tile.classList.contains('pos-move')){
                const to = [Number(tile.id[0]), Number(tile.id[1])]
                move.push(to);
                console.log(move);
                // send data to server
                move = [];
            } else {
                move = [];
                const from = [Number(tile.id[0]), Number(tile.id[1])]
                move.push(from);
            }
            showMovableTiles(i,j);
        });
        tile.textContent = boardPieces[i][j];
    });
});

// makes all the tiles the same color
const clearBoarColor = () => {
    board.forEach((row, i) => {
        row.forEach((tile, j) => {
            tile.style.backgroundColor = 'aqua';
        });
    });
    const posMoves = document.getElementsByClassName('pos-move');
    for(let i = 0; i < posMoves.length; i++){
        posMoves[i].classList.remove('pos-move');
    }
}

// function to color movable tiles 
const showMovableTiles = (i, j) => {
    clearBoarColor();
    currPiece = boardPieces[i][j];
    // all the offset for the pieces around the tile to be moved
    const posMoves = [[-1,0], [1,0], [0,-1], [0,1]];
    posMoves.forEach(offset => {
        try{
            // get the piece information
            const pieceText = boardPieces[i+offset[0]][j+offset[1]];
            // check the content of the tile of the posiible move and change color accordingly
            
            if(currPiece.split(' ')[1] === player){
                const tile = board[i+offset[0]][j+offset[1]];
                if(pieceText === ' '){
                    console.log('aqua');
                    tile.style.backgroundColor = 'aquamarine';
                    tile.classList.add('pos-move')
                } else if(pieceText === opponent){
                    tile.style.backgroundColor = 'red';
                    tile.classList.add('pos-move')
                    console.log('red');
                }
            }

        } catch(err) {
            console.log(err);
        }
    });
};
console.log(boardPieces[0][3]);

gameSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    console.log(data);
}