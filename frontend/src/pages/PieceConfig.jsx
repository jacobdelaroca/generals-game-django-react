
import { useState, useEffect, useContext } from "react";
import { WIDTH, PIECES, ConfigContext, apiUrl, Context, PIECESIMAGES, WIDTHPERCENT } from "../constant";
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
      .then(data => {
        // console.log("Response Data:", data);
        clearBoard();
      }) // Log response data
      .catch(error => console.error('Fetch error:', error)); // Handle errors
    }

    const clearBoard = () => {
      const tempPositions = cells.map( (cell) => 
        ({
            position: cell.position,
            piece: null
        })
      );
      setPiecePositions(tempPositions);
      setPiecesInHolder([...PIECES]);
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
        <button className="" onClick={ clearBoard }>Clear</button>
      </div>
    )
  }

  const ConfigBoard = ({ cells, dims, pieces }) => {
    console.log("cells length: ", cells.length)
    return (
        <>
          <div 
          className={`flex flex-wrap w-[60%]`} 
          style={ {  } }>
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
        className={`${""} border border-red-300 hover:bg-green-300 aspect-square flex items-center justify-center`} 
        onClick={() => handleCellClick(position, name)}
        style={ { width: `${WIDTHPERCENT}%` } }
        onDragOver={ (event) => {
            event.preventDefault();
        } }
        onDrop={(event) => {
            onDropHandler(event, position);
        }}
        >
        <p className="h-0 w-0">&nbsp;</p>
            {/* {position} */}
        {/* <div className="text-l flex justify-center">{(name === null)? "": <img src={`${PIECESIMAGES[name]}`} className="w-[90%]" />}</div> */}
        {(name === null)? "": <img src={`${PIECESIMAGES[name]}`} className="w-[90%]" />}
        </div>
        </>
    )
  }

  export default PieceConfigScreen