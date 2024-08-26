import { useContext, useEffect, useRef, useState } from "react"
import { HEIGHTPERCENT, WIDTH, WIDTHPERCENT } from "../constant";



function Board({board, move, updateBoard, whichPlayer}) {
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
      console.log("reaplying tranform", move);
      const elements = document.querySelectorAll('.pieces');
            elements.forEach(element => {
                element.style.transform = 'translate(0%, 0%)'; // Apply translation
            });
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
    pieceToMove.addEventListener("transitionend", e => {updateBoard()} );
  }, [move]);

  const cellClicked = (position, element) => {
    console.log(position);
  }


    return (
      <>
        <div className={`flex flex-wrap w-2/3 relative`} style={ {  } }>
          {/* { parseData(board).map( (piece, index) => { */}
          { board.map( (piece, index) => {
            return <Cell piece={ {...piece, index} } key={ index }/>
          })}
        </div>
      </>
    )
  }


function Cell({piece}) {
//   console.log(piece);
	const color = (piece.index % 2 === 0)? "bg-slate-50" : "bg-slate-600"; 
	return (
		<>
		<div 
			className={`${(piece.color === "")? color : piece.color} hover:bg-slate-800 aspect-square`} 
			style={{width: `${100/9}%`}} 
			onClick={() => {piece.onClick(piece.index, piece)}}>
				{piece.index}
		<div
		className="flex items-center justify-center absolute pieces"
		style={{
			// top: `${0}%`,
			// left: `${0}%`,
			width: `${WIDTHPERCENT}%`,
			height: `${HEIGHTPERCENT}%`,
		}}
		onClick={ () => {} }
		id={`piece-${piece.index}`}
		onTransitionEnd={() => {}} // add shit here
		>
		{(piece.piece !== " ") && <div className="w-10 h-10 rounded-full bg-red-200 piece">{piece.piece}</div>}
		</div>

		</div>
		</>
	)
}



export default Board