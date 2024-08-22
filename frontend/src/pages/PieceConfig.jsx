import Cell from "../components/Cell";
import Board from "../components/Board";
import { useState, useEffect, useContext } from "react";
import { WIDTH, PIECES, ConfigContext, apiUrl, Context } from "../constant";
import PieceHolder from "../components/PieceHolder";


const PieceConfigScreen = () => {
    const [cells, setCells] = useState([]);
    const [name, setName] = useState('test name');
    const [piecePositions, setPiecePositions] = useState([]);
    const [piecesInHolder, setPiecesInHolder] = useState([...PIECES]);
    const { credentials } = useContext(Context);

    useEffect(() => {
      const tempCells = [];
      for(let i = 0; i < 27; i++){
        tempCells.push({
          position: i
        });
      }
      setCells(tempCells);
      const tempPositions = tempCells.map( (cell) => 
        ({
            position: cell.position,
            piece: null
        })
      );
      setPiecePositions(tempPositions);
      
    }, []);
  
    const onDropHandler = (event, position) => {
        event.preventDefault();
        if(piecePositions[position].piece !== null){
            console.log("already a piece");
            return;
        }
        const data = event.dataTransfer.getData("text/plain").split(" ");
        const pieceName = data[0];
        const holderPos = data[1];
        const newPieceInHolder = piecesInHolder.filter((p, index) => index !== Number(holderPos));
        setPiecesInHolder(newPieceInHolder)
        const updatedPiecePosition = piecePositions.map(pieceObj => {
            if(pieceObj.position !== position){
                return pieceObj;
            } else {
                return {
                    position: pieceObj.position,
                    piece: pieceName
                }
            }
        })
        setPiecePositions(updatedPiecePosition);
        console.log(updatedPiecePosition);
    }
    
    const saveBoard = () => {
      
      if(piecesInHolder.length !== 0){
        console.log("some pieces still remining");
        alert("some pieces still remining");
        return;
      }
      
      if(name === ""){
        console.log("Name cannot be empty");
        alert("Name cannot be empty");
        return;
      }

      const chunkSize = 9;
      const result = [];

      for (let i = 0; i < piecePositions.length; i += chunkSize) {
        result.push(piecePositions.slice(i, i + chunkSize).map(piece => {
          return (piece.piece === null)? ' ' : piece.piece;
        }));
      }


      fetch(apiUrl + "game/add-board/", {
        method: "POST", // HTTP method
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Token " + credentials.token,
        },
        body: JSON.stringify({
          layout: result,
          name: name,
        })
      })
      .then(response => {
        console.log("Response Status:", response.status); // Log status code
        return response.json(); // Parse JSON response
      })
      .then(data => console.log("Response Data:", data)) // Log response data
      .catch(error => console.error('Fetch error:', error)); // Handle errors
    }

    const login = () => {
      fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"username": "test2", "password":"test"}),
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error("Error:", error));
    }

    const handleCellClick = (position, name) => {
        console.log(position, name);
        if(name === null){
            console.log("no piece to return");
            return;
        }
        const updatedPiecePosition = piecePositions.map(pieceObj => {
            if(pieceObj.position !== position){
                return pieceObj;
            } else {
                return {
                    position: pieceObj.position,
                    piece: null
                }
            }
        })
        setPiecePositions(updatedPiecePosition);
        setPiecesInHolder([{name: name}, ...piecesInHolder]);
    }


    return (
      <div>
        <input type="text" name="name" id="board-name" placeholder="Type here" value={name} onChange={ (e) => setName(e.target.value) }/>
        <div className="flex flex-row items-center">
          {/* <MyContext.Provider>
            <Board cells={ cells } />
            </MyContext.Provider> */}
          <PieceHolder pieces={piecesInHolder}/>
          <div className="w-20"/>

          <ConfigContext.Provider value={ {onDropHandler, handleCellClick} }>
              <ConfigBoard cells={ cells } dims={ { width: 9, height: 3}} pieces={piecePositions}/>
          </ConfigContext.Provider>
        </div>
        <button className="" onClick={ saveBoard }>Save</button>
        <button className="" onClick={ login }>Login</button>
      </div>
    )
  }

  const ConfigBoard = ({ cells, dims, pieces }) => {
    return (
        <>
          <div className={`grid grid-cols-9 relative `} style={ { width: `${WIDTH * dims.width}px`, height: `${WIDTH * dims.height}px` } }>
            { cells.map( (cell, index) => {
              return <ConfigCell position={ cell.position } key={ index } name={pieces[index].piece}/>
            }) }
          </div>
        </>
      )
  }

  const ConfigCell = ({ position, name }) => {
    const color = (position % 2 === 0) ? "bg-slate-50" : "bg-slate-700";
    const {onDropHandler, handleCellClick} = useContext(ConfigContext);
    return (
        <>
        <div 
        className={`${color} hover:bg-green-300 h-[${WIDTH}] flex-shrink-0 flex-grow-0 overflow-hidden`} 
        onClick={() => handleCellClick(position, name)}
        onDragOver={ (event) => {
            event.preventDefault();
        } }
        onDrop={(event) => {
            onDropHandler(event, position);
        }}
        >
            {/* {position} */}
        <div className="text-l">{(name === null)? "": name}</div>
        </div>
        </>
    )
  }

  export default PieceConfigScreen