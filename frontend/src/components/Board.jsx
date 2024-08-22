import { useContext, useEffect, useState } from "react"
import Cell from "./Cell"
import { WIDTH } from "../constant";

function Board() {
  
  
  
  const [cells, setCells] = useState([]);
  useEffect(() => {
    const tempCells = [];
    for(let i = 0; i < 72; i++){
      tempCells.push({
        position: i
      });
    }
    setCells(tempCells)
  }, []);

  const cellClicked = (position, element) => {
    console.log(position);
    element.style.transform = "translateY(-60px)";
  }


    return (
      <>
        <div className={`grid grid-cols-9 relative `} style={ { width: `${WIDTH * 9}px`, height: `${WIDTH * 8}px` } }>
          { cells.map( (cell, index) => {
            return <Cell position={ cell.position } key={ index }/>
          }) }
        </div>
      </>
    )
  }


export default Board