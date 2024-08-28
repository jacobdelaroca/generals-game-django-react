import { PIECESIMAGES, WIDTHPERCENT } from "../constant";

const BoardPreview = ({board}) => {
    return (
        <div className="w-full flex flex-wrap">
            {[...board[0], ...board[1], ...board[2]].map((cell, index) => (
                <div 
                    // className={`aspect-square ${(index % 2 === 0) ? "bg-slate-50" : "bg-slate-600"} flex items-center justify-center`}
                    className={`aspect-square flex items-center justify-center border border-red-300`}
                    style={{width: `${WIDTHPERCENT}%`}}
                >
                    {(cell !== " ") && <img src={`${PIECESIMAGES[cell]}`} className="w-[90%]"/>}
                    <p className="h-0 w-0">&nbsp;</p>
                </div>
            ))}

        </div>
    )
}

export default BoardPreview;