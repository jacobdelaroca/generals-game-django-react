import { useContext, useEffect, useState } from "react";
import { apiUrl, Context } from "../constant";
import { useNavigate } from "react-router-dom";
import ButtonLG from "../components/ButtonLG";

const JoinGame = () => {
    const {credentials} = useContext(Context);
    const [roomName, setRoomName] = useState('');
    const [newRoomName, setNewRoomName] = useState('');
    const [boardNum, setBoardNum] = useState(0);

    const navigate = useNavigate();

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
            setBoardNum(data.length);
          }) 
          .catch(error => console.error('Fetch error:', error));
    }, [])

    const handleJoinOnclick = (e) => {
        e.preventDefault();
        if(roomName === ""){
            alert("name cannot be empty");
            return;
        }
        fetch(apiUrl + "game/join/", {
            method: "POST", // HTTP method
            headers: {
              "Authorization": "Token " + credentials.token,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "room_name": roomName
            })
          })
          .then(response => {
            console.log("Response Status:", response.status); // Log status code
            if(response.ok){
                return response.json();
            } else {
                return response.json();
            }
          })
          .then(data => {
            if(data.error){
                throw new Error(data.error);
            }
            console.log("Response Data:", data);
            navigate(`/game/${roomName}`, {state: {host: false}});
        }) 
        .catch(error => {
            alert(error);
            console.error('Fetch error:', error); 
            navigate(`/join`, {state: {host: true}});    
        })
    }
    const handleCreateRoomClick = (e) => {
        e.preventDefault();
        if(newRoomName === ""){
            alert("name cannot be empty");
            return;
        }
        fetch(apiUrl + "game/create-room/", {
            method: "POST", // HTTP method
            headers: {
                "Authorization": "Token " + credentials.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "room_name": newRoomName
            })
        })
        .then(response => {
            console.log("Response Status:", response.status); // Log status code
            if(response.ok){
                return response.json();
            } else {
                throw new Error("Room with same name exist")
            }
        })
        .then(data => {
            console.log("Response Data:", data);
            navigate(`/game/${newRoomName}`, {state: {host: true}});
        }) 
        .catch(error => {
            alert(error);
            console.error('Fetch error:', error); 
            navigate(`/join`, {state: {host: true}});    
        })
    }
    
    return(
        <>
        {(boardNum === 0) && <h2>You have no boards to use. Please Create one first.</h2>}
        {(boardNum !== 0) &&
            <div className=" w-full h-full flex justify-center items-center">
                {(credentials.user === '') && <h1>Login first</h1>}
                {(credentials.user !== '') && <div className="xl:w-1/3 xl:p-10 rounded-xl flex flex-col items-center border bg-light">
                    <p className="text-xl xl:mt-4">Enter the name of the room you want to join:</p>
                    <form onSubmit={handleJoinOnclick} className="xl:w-1/2 xl:h-1/2 xl:mb-7 flex flex-col items-center">
                        <input className="xl:h-10 xl:w-full border m-2 p-1 text-center rounded-lg xl:mb-2" placeholder="Room Name" type="text" name="room-name" id="room-name-input" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
                        <ButtonLG color={"bg-medium-1"} onClick={handleJoinOnclick} customWidth={'xl:w-full'} text={'Join Room'}></ButtonLG>
                    </form>

                    <p className="text-xl xl:mt-4">Create a room for your friend to join:</p>
                    <form className="w-1/2 h-1/2 flex flex-col items-center">
                        <input className="xl:h-10 xl:w-full border m-2 p-1 text-center rounded-lg xl:mb-2" placeholder="Room Name" type="text" name="room-name" id="new-room-name-input" value={newRoomName} onChange={(e) => setNewRoomName(e.target.value)} />
                        <ButtonLG color={"bg-medium-1"} onClick={handleCreateRoomClick} customWidth={'xl:w-full'} text={'Create Room'}></ButtonLG>
                    </form>
                </div>}
            </div>
        }
        </>
    )
}

export default JoinGame