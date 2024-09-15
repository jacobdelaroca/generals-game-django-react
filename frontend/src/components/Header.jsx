import { useContext } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { Context } from "../constant"


const Header = () => {
    const { credentials } = useContext(Context);
    const navItems = [
        {
            name: "Play",
            link: "join"
        },
        {
            name: "Boards",
            link: "layout/boards"
        },
        {
            name: "Home",
            link: "/"
        },
        // {
        //     name: `${credentials.user}`,
        //     link: "/"
        // },
    ]
    return (
        <div className="w-full h-screen flex flex-col ">
            <nav className="bg-dark w-full z-50">
                {(credentials.user === "") && <NavLink className='float-right text-center justify-center p-4 flex min-w-28 items-center text-2xl hover:text-black hover:bg-light text-white' to={'login'} key={"login key"}>Login</NavLink>}
                {navItems.map((item, index) => (
                    <NavLink className='float-right text-center justify-center p-4 flex min-w-28 items-center text-2xl hover:text-black hover:bg-light text-white' to={item.link} key={item.name + index.toString()}>{item.name}</NavLink>
                ))}
            </nav>
            <main 
            className="flex flex-grow">
                <Outlet />
            </main>
        </div>
    )
}

export default Header