import { useContext, useEffect, useState } from "react";
import { apiUrl, Context } from "../constant";
import { useNavigate } from "react-router-dom";

const JoinGame = () => {
    const {credentials} = useContext(Context);
    const [roomName, setRoomName] = useState('');
    const [newRoomName, setNewRoomName] = useState('');
    const navigate = useNavigate();

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
        <div className=" w-full h-1/2 flex justify-center mt-4">
            {(credentials.user === '') && <h1>Login first</h1>}
            {(credentials.user !== '') && <div className="w-2/3 flex flex-row">
                
                <form onSubmit={handleJoinOnclick} className="w-1/2 h-1/2 flex flex-col items-center">
                    <input className="h-10" placeholder="room name" type="text" name="room-name" id="room-name-input" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
                    <input type="submit" value="Join" className=""/>
                </form>

                <form onSubmit={handleCreateRoomClick} className="w-1/2 h-1/2 flex flex-col items-center">
                    <input className="h-10" placeholder="room name" type="text" name="room-name" id="new-room-name-input" value={newRoomName} onChange={(e) => setNewRoomName(e.target.value)} />
                    <input type="submit" value="Create Room" className=""/>
                </form>
            </div>}
        </div>
    )
}

export default JoinGame