import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom"
import { Context } from "../constant";

const BoardLayout = () => {
    const {credentials} = useContext(Context);
    
    return(
        <div className="w-full h-full">
            <nav className="flex flex-row">
                <NavLink className='h-10 text-xl' to={'config'}>Create new Board</NavLink>
                {credentials.user !== '' && <NavLink className='h-10 text-xl' to={'boards'}>My Boards</NavLink>}
            </nav>
            <div className="w-full h-full">
                <Outlet />
            </div>
        </div>
    )
}

export default BoardLayout;