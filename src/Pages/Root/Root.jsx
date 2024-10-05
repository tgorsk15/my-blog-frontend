import { NavBar } from '../../Components/NavBar/NavBar'
import { Outlet } from 'react-router-dom';
import { useState } from 'react'

export const Root = () => {
    const [token, setToken] = useState('')

    return (
        <div>
            <nav>
                <NavBar />
            </nav>
            <main>
                hi Root
                <Outlet context={{
                    setToken,
                }}/>
            </main>
            
        </div>
    )
}