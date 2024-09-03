import { useContext, useEffect, useState } from "react"
import { apiUrl, Context } from "../constant"
import BoardPreview from "../components/BoardPreview";
import { useNavigate } from "react-router-dom";
import ButtonLG from "../components/ButtonLG";
import ButtonMD from "../components/ButtonMD";
import PaginationNav from "../components/PaginationNav";
import HRDivider from "../components/HRDivider";

const MyBoards = () => {
    const {credentials} = useContext(Context);
    const [boards, setBoards] = useState([]);
    const [boardsShown, setBoardsShown] = useState([]);
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
        <div className="flex justify-center pt-4 flex-col items-center">
          {(boards.length === 0) && <h2 className="text-2xl m-6">You have no boards yet. Create one.</h2>}
            <PaginationNav items={boards} itemsPerPage={6} setItemsShown={setBoardsShown}/>
            {(boards.length !== 0) && 
            <ul className="w-11/12 gap-4 grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 grid-cols-1 pt-5">
                {boardsShown.map(board => (<li>
                    <div key={board.id} className="w-[100%] bg-white flex flex-col p-5 drop-shadow-md rounded-lg border-medium-1">
                        <h1 className="mb-2 text-2xl">
                          {board.name}

                        </h1>
                        <BoardPreview board={board.layout} />
                        <div className="flex flex-col items-center justify-between pt-4">
                          <ButtonMD customWidth={"w-4/5"} text={"Edit"} color={"bg-medium-1"} onClick={ () => editBoardHandler(board.layout, board.name, board.id) }></ButtonMD>
                          <ButtonMD customWidth={"w-4/5"} text={"Delete"} color={"bg-red-500"} onClick={ () => deleteBoardHandler(board.id) }></ButtonMD>
                          {/* <button className="px-7 mt-2 border rounded-md bg-medium-1" onClick={ () => editBoardHandler(board.layout, board.name, board.id)  }>Edit</button>
                          <button className="px-7 mt-2 border rounded-md bg-red-400" onClick={ () => deleteBoardHandler(board.id) }>Delete</button> */}
                        </div>
                    </div>
                </li>))}
            </ul>}
        </div>
    )
} 

export default MyBoards