import { useContext } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { Context } from "../constant"


const Header = () => {
    const { credentials } = useContext(Context);
    const navItems = [
        {
            name: "Home",
            link: "/"
        },
        {
            name: "Boards",
            link: "layout/boards"
        },
        {
            name: "Play",
            link: "join"
        },
        // {
        //     name: `${credentials.user}`,
        //     link: "/"
        // },
    ]
    return (
        <div className="w-full h-screen flex flex-col">
            <nav className="flex flex-none flex-row h-16 items-center justify-end p-9 bg-dark w-full">
                {navItems.map((item, index) => (
                    <NavLink className='px-4 flex items-center h-16 text-2xl hover:text-black hover:bg-light text-white' to={item.link} key={item.name + index.toString()}>{item.name}</NavLink>
                ))}
                {(credentials.user === "") && <NavLink className='px-4 text-2xl hover:text-red-500' to={'login'} key={"login key"}>Login</NavLink>}
            </nav>
            <main className="flex flex-grow">
                <Outlet />
            </main>
        </div>
    )
}

export default Header