import { NavBar } from '../../Components/NavBar/NavBar'
import { Outlet } from 'react-router-dom';

export const Root = () => {
    return (
        <div>
            <nav>
                <NavBar />
            </nav>

            <Outlet />
        </div>
    )
}