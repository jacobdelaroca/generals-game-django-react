import { useContext, useEffect, useState } from "react";
import { apiUrl, Context } from "../constant";

const JoinGame = () => {
    const {credentials} = useContext(Context);
    const [boards, setBoards] = useState(null);
    const [selectedBoard, setSelectedBoard] = useState(null);
    let loaded = false;
    useEffect(() => {
        fetch(apiUrl + "game/my-boards/", {
            method: "GET", // HTTP method
            headers: {
              "Authorization": "Token " + credentials.token,
            },
          })
          .then(response => {
            console.log("Response Status:", response.status); // Log status code
            if(response.ok){
                return response.json();
            } else {
                return null
            }
          })
          .then(data => {
            console.log("Response Data:", data);
            setBoards(data);
          }) 
          .catch(error => console.error('Fetch error:', error)); 
    }, [])

    const handleJoinOnclick = (e) => {
        e.preventDefault();
        console.log(selectedBoard);
    }

    return(
        <div className=" w-full h-1/2 flex justify-center mt-4">
            {(boards === null) && <h1>Login first</h1>}
            {(boards !== null) && <div className="w-2/3 flex flex-row">
                <ul>
                    {boards.map(board => {
                        return <li>
                            <button onClick={ () => setSelectedBoard(board.layout) } className="bg-purple-400 w-20 my-2">
                                {board.name}
                            </button>
                            </li>
                    })}
                </ul>
                <form onSubmit={handleJoinOnclick} className="w-1/2 h-1/2 flex flex-col items-center">
                    <input className="h-10" placeholder="room name" type="text" name="room-name" id="room-name-input" />
                    <input type="submit" value="Join" className=""/>
                </form>
            </div>}
        </div>
    )
}

export default JoinGame