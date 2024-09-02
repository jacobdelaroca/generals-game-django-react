import { useContext, useState } from "react"
import { apiUrl, Context } from "../constant"
import { data } from "autoprefixer";
import { useNavigate } from "react-router-dom";
import ButtonLG from "../components/ButtonLG";

const Login = () => {

    const [username, setUsername] = useState('test1');
    const [password, setPassword] = useState('test');
    const [confirmPassword, setConfirmPassword] = useState('test');
    const { setCredentials } = useContext(Context);
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        const url = `${apiUrl}login/`;
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
            username: username,
            password: password,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setCredentials(data);
            navigate('/');
        })
        .catch(error => console.log(error));
    }

    const handleSignUp = () => {
        if(password !== confirmPassword){
            alert("password must match");
            return;
        } else {
            fetch(`${apiUrl}signup/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                  },
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
    }

    return (
        <div className="w-1/3 rounded-lg bg-light mx-auto my-auto py-6 flex flex-col items-center justify-center">
            <h2 className="text-xl">Login</h2>
            <div className="flex py-6 w-2/5 flex-col items-center justify-center">
                <input onChange={(e) => {setUsername(e.target.value)}} value={username} className='my-3 w-full h-10 rounded px-1' type="text" placeholder="Username"></input>
                <input onChange={(e) => {setPassword(e.target.value)}} value={password} className='my-3 w-full h-10 rounded px-1' type="text" placeholder="Password"></input>
                
                <ButtonLG color={"bg-medium-1"} text={"Login"} customWidth={"w-full"} onClick={handleSubmit}/>
            </div>
            <h2 className="text-xl">Sign Up</h2>

            <div className="flex py-6 w-2/5 flex-col items-center justify-center">
                <input onChange={(e) => {setUsername(e.target.value)}} value={username} className='my-3 w-full h-10 rounded px-1' type="text" placeholder="Username"></input>
                <input onChange={(e) => {setPassword(e.target.value)}} value={password} className='my-3 w-full h-10 rounded px-1' type="text" placeholder="Password"></input>
                <input onChange={(e) => {setConfirmPassword(e.target.value)}} value={confirmPassword} className='my-3 w-full h-10 rounded px-1' type="text" placeholder="Confirm Password"></input>
                
                <ButtonLG color={"bg-medium-1"} text={"Sign Up"} customWidth={"w-full"} onClick={handleSignUp}/>
            </div>
        </div>
    )
}

export default Login