import { useContext } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { Context } from "../constant"

const navItems = [
    {
        name: "Home",
        link: "/"
    },
    {
        name: "Layout",
        link: "layout"
    },
    {
        name: "Join",
        link: "join"
    },
]

const Header = () => {
    const { credentials } = useContext(Context);
    return (
        <div className="w-full h-screen flex flex-col">
            <nav className="flex flex-none flex-row h-16 items-center justify-end p-9 bg-slate-200 w-full">
                {navItems.map((item, index) => (
                    <NavLink className='px-4 text-2xl hover:text-red-500' to={item.link} key={item.name + index.toString()}>{item.name}</NavLink>
                ))}
                {credentials.user}
                {(credentials.user === "") && <NavLink className='px-4 text-2xl hover:text-red-500' to={'login'} key={"login key"}>Login</NavLink>}
            </nav>
            <main className="flex flex-grow">
                <Outlet />
            </main>
        </div>
    )
}

export default Header