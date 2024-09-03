import { useContext, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom"
import { Context } from "../constant";
import LoginCallOut from "../components/LoginCallOut";

const BoardLayout = () => {
    const {credentials} = useContext(Context);
    const [selected, setSelected] = useState("my-boards");
    
    return(
        <div className="w-full h-full">
            {(credentials.user === '') && <LoginCallOut />}
            {(credentials.user !== '') && 
            <>
            {/* <h1>{credentials.user}</h1> */}
            <div className="w-full flex xl:flex-row flex-col">
                <nav className="flex xl:flex-col xl:w-1/5 xl:m-5 flex-col m-3" onScroll={{}}>
                    <Link className={`h-10 text-xl underline-offset-8 ${(selected === "my-boards") ? "underline" : ""}`} onClick={() => setSelected("my-boards")} to={'boards'}>My Boards</Link>
                    <Link className={`h-10 text-xl underline-offset-8 ${(selected === "create-board") ? "underline" : ""}`} onClick={() => setSelected("create-board")} to={'config'}>Create new Board</Link>
                </nav>
                <div className="xl:w-4/5 h-full flex items-center flex-col">
                    <Outlet />
                </div>
            </div>
            </>
            }
        </div>
    )
}

export default BoardLayout;