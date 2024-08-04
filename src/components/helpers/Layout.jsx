import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <main className="flex mt-12 mx-40 justify-center">
            <Outlet />
        </main>
    )
}

export default Layout
