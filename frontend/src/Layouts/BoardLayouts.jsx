import { useContext, useState } from "react";
import { NavLink, Outlet } from "react-router-dom"
import { Context } from "../constant";

const BoardLayout = () => {
    const {credentials} = useContext(Context);
    const [selected, setSelected] = useState("my-boards");
    
    return(
        <div className="w-full h-full">
            {(credentials.user === '') && <h1>Login first</h1>}
            {(credentials.user !== '') && 
            <>
            {/* <h1>{credentials.user}</h1> */}
            <div className="w-full flex flex-row">
                <nav className="flex flex-col xl:w-1/5 xl:m-5" onScroll={{}}>
                    <NavLink className={`h-10 text-xl underline-offset-8 ${(selected === "my-boards") ? "underline" : ""}`} onClick={() => setSelected("my-boards")} to={'boards'}>My Boards</NavLink>
                    <NavLink className={`h-10 text-xl underline-offset-8 ${(selected === "create-board") ? "underline" : ""}`} onClick={() => setSelected("create-board")} to={'config'}>Create new Board</NavLink>
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