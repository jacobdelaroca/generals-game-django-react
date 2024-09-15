import { useContext, useState } from "react"
import { apiUrl, Context } from "../constant"
import { data } from "autoprefixer";
import { useNavigate } from "react-router-dom";
import ButtonLG from "../components/ButtonLG";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { setCredentials } = useContext(Context);
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        const url = `${apiUrl}login/`;
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie("csrftoken")
              },
            credentials: "include",
            body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if(data.error){
            alert(data.error.username);
            return;
        }
        console.log(data);
        setCredentials(data);
        navigate('/');
    })
    .catch(error => console.log(error));
    }
    
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }
    
    const handleSignUp = () => {
        if(newPassword !== confirmPassword){
            alert("password must match");
            return;
        } else {
            const csrfToken = getCookie("csrftoken");
            fetch(`${apiUrl}signup/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie("csrftoken")
                },
                body: JSON.stringify({
                username: newUsername,
                password: newPassword,
                csrfmiddlewaretoken: csrfToken,
                }),
            })
            .then(response => response.json())
            .then(data => {
                if(data.error){
                    alert(data.error.username);
                    return;
                }
                console.log(data);
                setCredentials(data);
                navigate('/');
            })
            .catch(error => console.log(error));
        }
    }

    return (
        <div className="w-1/3 rounded-lg bg-white shadow-lg mx-auto my-auto py-6 flex flex-col items-center justify-center">
            <h2 className="text-xl">Login</h2>
            <div className="flex py-6 w-2/5 flex-col items-center justify-center">
                <input name="username" onChange={(e) => {setUsername(e.target.value)}} value={username} className='border-2 my-3 w-full h-10 rounded px-1' type="text" placeholder="Username"></input>
                <input name="password" onChange={(e) => {setPassword(e.target.value)}} value={password} className='border-2 my-3 w-full h-10 rounded px-1' type="text" placeholder="Password"></input>
                
                
                <ButtonLG color={"bg-medium-1"} text={"Login"} customWidth={"w-full"} onClick={handleSubmit}/>
            </div>
            <h2 className="text-xl">Sign Up</h2>

            <div method="POST" action={`${apiUrl}login/`} className="flex py-6 w-2/5 flex-col items-center justify-center">
                <input onChange={(e) => {setNewUsername(e.target.value)}} value={newUsername} className='border-2 my-3 w-full h-10 rounded px-1' type="text" placeholder="Username"></input>
                <input onChange={(e) => {setNewPassword(e.target.value)}} value={newPassword} className='border-2 my-3 w-full h-10 rounded px-1' type="text" placeholder="Password"></input>
                <input onChange={(e) => {setConfirmPassword(e.target.value)}} value={confirmPassword} className='border-2 my-3 w-full h-10 rounded px-1' type="text" placeholder="Confirm Password"></input>
                
                <ButtonLG color={"bg-medium-1"} text={"Sign Up"} customWidth={"w-full"} onClick={handleSignUp}/>
            </div>
        </div>
    )
}

export default Login