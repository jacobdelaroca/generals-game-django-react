import { useContext, useEffect, useState } from "react"
import { apiUrl, Context } from "../constant"
import BoardPreview from "../components/BoardPreview";
import { useNavigate } from "react-router-dom";

const MyBoards = () => {
    const {credentials} = useContext(Context);
    const [boards, setBoards] = useState([]);
    const navigate = useNavigate();


    const updateBoards = () => {
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
    }

    useEffect(() => {
        updateBoards()
    }, [])

    const deleteBoardHandler = (id) => {
      fetch(apiUrl + "game/add-board/" + String(id) + "/", {
        method: "DELETE", // HTTP method
        headers: {
          Authorization: "Token " + credentials.token,
        },
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
      alert("deleted");
      updateBoards();
      return;
    }

    const editBoardHandler = (board, name, id) => {
      navigate('/layout/config', {state: {board, boardName: name, boardId: Number(id)}})
    }


    return (
        <div className="flex justify-center w-[60%]">
            <ul>
                {boards.map(board => (<li>
                    <div className="w-2/3 flex items-center flex-col">
                        <h1 className="mb-2">
                          Name: {board.name}

                        </h1>
                        <BoardPreview board={board.layout} />
                        <button onClick={ () => deleteBoardHandler(board.id) }>Delete</button>
                        <button onClick={ () => editBoardHandler(board.layout, board.name, board.id)  }>Edit</button>
                    </div>
                </li>))}
            </ul>
        </div>
    )
} 

export default MyBoards