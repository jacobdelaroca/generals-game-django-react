import { useContext, useEffect, useRef, useState } from "react"
import { GameContext, HEIGHTPERCENT, PIECESIMAGES_BLACK, PIECESIMAGES_WHITE, WIDTH, WIDTHPERCENT } from "../constant";



function Board({board, move, updateBoard, whichPlayer, turn}) {
  const {myTurn} = useContext(GameContext);
  const parseData = (data) => {
    const parsedData = [];
    data.forEach((row, rowInd) => {
        row.forEach((col, colInd) => {
            parsedData.push({
                piece: col,
                position: {
                    x: rowInd,
                    y: colInd
                }
            })
        })
    })
    return parsedData;
  }


  useEffect(() => {
    if(move === null){
      // console.log("reaplying tranform", move);
      const elements = document.querySelectorAll('.pieces');
            elements.forEach(element => {
                element.style.transform = 'translate(0%, 0%)'; // Apply translation
            });
      return;
    } 
    // surrendered
    if(move === true){
      updateBoard(false);
      return;
    } 
    // convert 2d position to 1d position jesus fuck why
    let index;
	let yDisp
	let xDisp
	if(whichPlayer === "p1"){
		index = move[0][1] + move[0][0] * 9;
		// get displacement in x or y
		yDisp = move[1][0] - move[0][0]; 
		xDisp = move[1][1] - move[0][1]; 
	} else {
		index = 71 - (move[0][1] + move[0][0] * 9);
		// get displacement in x or y
		yDisp = (move[1][0] - move[0][0]) * -1; 
		xDisp = (move[1][1] - move[0][1]) * -1; 
	}
    const pieceToMove = document.getElementById(`piece-${index}`);
    pieceToMove.style.transform = `translate(${xDisp*100}%, ${yDisp * 100}%)`;
    pieceToMove.addEventListener("transitionend", e => {updateBoard(myTurn)});
  }, [move]);

  const cellClicked = (position, element) => {
    console.log(position);
  }


    return (
      <>
        <div className={`flex flex-wrap relative`} style={ {  } }>
          {/* { parseData(board).map( (piece, index) => { */}
          { board.map( (piece, index) => {
            return <Cell piece={ {...piece, index} } whichPlayer={whichPlayer} key={ index }/>
          })}
        </div>
      </>
    )
  }


function Cell({piece, whichPlayer}) {
//   console.log(piece);
	const color = (piece.index % 2 === 0)? "bg-slate-50" : "bg-slate-600"; 
	const isPlayerPiece = piece.piece.split(" ")[1] === whichPlayer;
  return (
		<div 
			className={`${(piece.color === "")? "" : piece.color} border border-red-300 hover:bg-slate-800 aspect-square relative`} 
			style={{width: `${100/9}%`}} 
			onClick={() => {piece.onClick(piece.index, piece)}}>
        <p className="text-transparent">
          {piece.index}
        </p>
      <div
      className="flex items-center justify-center absolute pieces w-full"
      style={{
        top: `${7}%`,
        left: `${5}%`,
        width: `${90}%`,
        height: `${90}%`,
        // width: `${WIDTHPERCENT - 1}%`,
        // height: `${HEIGHTPERCENT}%`,
      }}
      onClick={ () => {} }
      id={`piece-${piece.index}`}
      onTransitionEnd={() => {}} // add shit here
      >
      {(piece.piece.length > 2) ? 
        (isPlayerPiece) ? 
          <img className="border border-black" src={`${PIECESIMAGES_BLACK[`${piece.piece.split(" ")[0]}`]}`}/>
          : 
          <img className="border border-black" src={`${PIECESIMAGES_WHITE[`${piece.piece.split(" ")[0]}`]}`}/> 
        : ""
        }
      {/* {(piece.piece.length > 2) && piece.piece.split(" ")[0]} */}
      {(piece.piece.length === 2) && <img className="border border-black" src={`https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/GotG-flagW.svg/1920px-GotG-flagW.svg.png`}/>}
      {/* {(piece.piece !== " ") && <div className="h-10 rounded-full bg-red-200 piece block aspect-square">{piece.piece}</div>} */}
      </div>

		</div>
	)
}



export default Board