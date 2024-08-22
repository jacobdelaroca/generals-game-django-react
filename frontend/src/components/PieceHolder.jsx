import { WIDTH } from "../constant"

const PieceHolder = ({ pieces }) => {
    return(
        <div className="w-[180px] h-[600px] bg-slate-400 flex flex-shrink-0 flex-row flex-wrap">
            {pieces.map((piece, index) => {
                return <div 
                className={`cursor-move hover:bg-slate-700 flex-shrink-0`}
                style={{width: `${WIDTH}px`, height: `${WIDTH}px`}}
                id={`piece-${index}`}
                key={`piece-${index}`}
                onDragStart={ (event) => { 
                    event.dataTransfer.setData("text/plain", piece.name + " " + String(index));
                    console.log(event); 
                }}
                draggable={true}
                >
                    <h1>{piece.name}</h1>
                </div>
            })}
        </div>
    )
}

export default PieceHolder