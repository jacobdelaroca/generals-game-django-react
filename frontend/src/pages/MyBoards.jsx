import { useContext, useEffect, useState } from "react"
import { apiUrl, Context } from "../constant"

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
        <div>
            <ul>
                {boards.map(board => (<li>
                    <div>
                        name: {board.name}
                        layout: {board.layout}
                    </div>
                </li>))}
            </ul>
        </div>
    )
} 

export default MyBoards