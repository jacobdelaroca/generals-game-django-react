import { PIECESIMAGES, WIDTH } from "../constant"

const PieceHolder = ({ pieces, setPieceToPlace, pieceToPlace }) => {
    let highlightIndex = -1;
    if (pieceToPlace !== ""){
        const data = pieceToPlace.split(" ");
        const pieceName = data[0];
        const holderPos = data[1];
        highlightIndex = Number(holderPos)
    }
    return(
        <div className="w-[30%] min-h-72: bg-slate-400 flex flex-shrink-0 flex-row flex-wrap items-center justify-center">
            {pieces.map((piece, index) => {
                return <div 
                className={`${(highlightIndex === index) ? "border-2 border-green-500" : ""} cursor-move aspect-square hover:bg-slate-700 flex-shrink-0 flex items-center justify-center`}
                style={{width: `${20}%`,}}
                id={`piece-${index}`}
                key={`piece-${index}`}
                onClick={ () => {setPieceToPlace(piece.name + " " + String(index))} }
                onDragStart={ (event) => { 
                    event.dataTransfer.setData("text/plain", piece.name + " " + String(index));
                    console.log(event); 
                }}
                draggable={true}
                >
                    {/* <h1>{piece.name}</h1> */}
                    <img src={`${PIECESIMAGES[piece.name]}`} style={{width: "90%"}}/>
                </div>
            })}
            <div className="aspect-square" style={{width: `${20}%`,}}>&nbsp;</div>
        </div>
    )
}

export default PieceHolder