import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <main className="flex justify-center">
            <Outlet />
        </main>
    )
}

export default Layout
