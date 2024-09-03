import { PIECESIMAGES_BLACK, WIDTH } from "../constant"

const PieceHolder = ({ pieces, setPieceToPlace, pieceToPlace }) => {
    let highlightIndex = -1;
    if (pieceToPlace !== ""){
        const data = pieceToPlace.split(" ");
        const pieceName = data[0];
        const holderPos = data[1];
        highlightIndex = Number(holderPos)
    }
    return(
        <div 
        style={{boxShadow: "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset"}} 
        className={`w-full xl:mt-7 ${(pieces.length === 0)? "hidden" : ""} border-2 p-3 flex flex-shrink-0 flex-row flex-wrap items-center justify-center`}>
            {pieces.map((piece, index) => {
                return <div 
                className={`${(highlightIndex === index) ? "border-green-500" : "border-transparent"} border-2 cursor-move m-1 hover:border-2 hover:border-green-500 box-border flex-shrink-0 flex items-center justify-center`}
                style={{width: `${10}%`,}}
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
                    <img src={`${PIECESIMAGES_BLACK[piece.name]}`} draggable={true} style={{width: "100%"}}/>
                </div>
            })}
        </div>
    )
}

export default PieceHolder