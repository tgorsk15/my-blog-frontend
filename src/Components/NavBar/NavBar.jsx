import { Link } from 'react-router-dom'
import { useAuth } from '../../utils/useAuth'

import '../../App.css'

export const NavBar = () => {
    const { userData, logout } = useAuth();
    console.log('user in nav bar', userData)

function handleLogout() {
    logout()
}


    return (
        <nav className='navbar-section'>
            {userData && userData.isAuthor === true && (
                <h2>Hi {userData.firstName}</h2>
            )}
            <div className='links-container'>
                <ul className='nav-links'>
                    {userData && (
                        <li>
                            <Link to="/home">Home</Link>
                        </li>
                    )}
                    {userData && userData.isAuthor && (
                        <li>
                            <Link to="/blogDash">Author Hub</Link>
                        </li>
                    )}
                    {userData ? (
                        <li>
                            <Link to="/profile" onClick={handleLogout}>Logout</Link>
                        </li>
                    
                    ) : (
                        <li>
                            <Link to="/profile">Log In</Link>
                        </li>
                    )}
                     
                </ul>
                
            </div>
            
        </nav>
    )
}