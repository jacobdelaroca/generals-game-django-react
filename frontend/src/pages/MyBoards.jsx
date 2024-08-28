import { useContext, useEffect, useState } from "react"
import { apiUrl, Context } from "../constant"
import BoardPreview from "../components/BoardPreview";

const MyBoards = () => {
    const {credentials} = useContext(Context);
    const [boards, setBoards] = useState([]);
    useEffect(() => {
        fetch(apiUrl + "game/my-boards/", {
            method: "GET", // HTTP method
            headers: {
              "Authorization": "Token " + credentials.token,
            },
          })
          .then(response => {
            console.log("Response Status:", response.status); // Log status code
            return response.json();
          })
          .then(data => {
            console.log("Response Data:", data);
            setBoards(data);
          }) 
          .catch(error => console.error('Fetch error:', error)); 
    }, [])


    return (
        <div className="flex justify-center w-[60%]">
            <ul>
                {boards.map(board => (<li>
                    <div className="w-2/3 flex items-center flex-col">
                        <h1 className="mb-2">
                          Name: {board.name}

                        </h1>
                        <BoardPreview board={board.layout} />
                    </div>
                </li>))}
            </ul>
        </div>
    )
} 

export default MyBoards