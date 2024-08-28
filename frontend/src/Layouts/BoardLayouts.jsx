import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom"
import { Context } from "../constant";

const BoardLayout = () => {
    const {credentials} = useContext(Context);
    
    return(
        <div className="w-full h-full">
            {(credentials.user === '') && <h1>Login first</h1>}
            {(credentials.user !== '') && 
            <>
            <nav className="flex flex-row">
                <NavLink className='h-10 text-xl' to={'config'}>Create new Board</NavLink>
                {credentials.user !== '' && <NavLink className='h-10 text-xl' to={'boards'}>My Boards</NavLink>}
            </nav>
            <div className="w-full h-full flex items-center flex-col">
                <Outlet />
            </div>
            </>
            }
        </div>
    )
}

export default BoardLayout;