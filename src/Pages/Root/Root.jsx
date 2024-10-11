import { NavBar } from '../../Components/NavBar/NavBar'
import { Outlet } from 'react-router-dom';

export const Root = () => {

    return (
        <div>
            <nav>
                <NavBar />
            </nav>
            <main>
                hi Root
                <Outlet context={{

                }}/>
            </main>
            
        </div>
    )
}