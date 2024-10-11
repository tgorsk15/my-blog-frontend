import { Link } from 'react-router-dom'
import { useAuth } from '../../utils/useAuth'

import '../../App.css'

export const NavBar = () => {
    const { userData } = useAuth();
    console.log('user in nav bar', userData)

    return (
        <nav className='navbar-section'>
            {userData.isAuthor && (
                <h2>Hi {userData.firstName}</h2>
            )}
            <div className='links-container'>
                <ul className='nav-links'>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    {userData.isAuthor && (
                        <li>
                            <Link to="/blogDash">Author Hub</Link>
                        </li>
                    )}
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li> 
                </ul>
                
            </div>
            
        </nav>
    )
}