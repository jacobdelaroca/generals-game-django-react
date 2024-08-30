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
        <div className="flex justify-center">
            <ul className="grid grid-cols-2 pt-5">
                {boards.map(board => (<li>
                    <div className="w-2/3 flex flex-col p-5 border rounded-lg bg-light my-2">
                        <h1 className="mb-2 text-xl">
                          {board.name}

                        </h1>
                        <BoardPreview board={board.layout} />
                        <div className="flex flex-row justify-between">
                          <button className="px-7 mt-2 border rounded-md bg-medium-1" onClick={ () => editBoardHandler(board.layout, board.name, board.id)  }>Edit</button>
                          <button className="px-7 mt-2 border rounded-md bg-red-400" onClick={ () => deleteBoardHandler(board.id) }>Delete</button>
                        </div>
                    </div>
                </li>))}
            </ul>
        </div>
    )
} 

export default MyBoards