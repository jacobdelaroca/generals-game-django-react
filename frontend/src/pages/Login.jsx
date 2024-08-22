import { useContext, useState } from "react"
import { apiUrl, Context } from "../constant"
import { data } from "autoprefixer";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState('test1');
    const [password, setPassword] = useState('test');
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

    return (
        <div className="w-[900px] bg-slate-400 mx-auto my-auto h-full flex items-center justify-center">
            <form onSubmit={ handleSubmit } className="flex h-96 flex-col items-center justify-center">
                <input onChange={(e) => {setUsername(e.target.value)}} value={username} className='my-3 h-10 rounded px-1' type="text" placeholder="Username"></input>
                <input onChange={(e) => {setPassword(e.target.value)}} value={password} className='my-3 h-10 rounded px-1' type="text" placeholder="Password"></input>
                <input type="text" name="" id="" />
                <input type="text" name="" id="" />
                <input type="text" name="" id="" />
                <input className='my-3 h-10 rounded px-1 border-slate-500 border bg-green-300 w-full ' type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Login