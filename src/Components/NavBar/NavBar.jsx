import { Link } from 'react-router-dom'
import { useAuth } from '../../utils/useAuth'

import '../../App.css'

export const NavBar = () => {
    const { logout } = useAuth();
    const userData = JSON.parse(localStorage.getItem('user'))
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
                        <div className='dropdown-section'>
                            <button className='profile-btn'>
                                Profile <i className="fa-solid fa-caret-down"></i>
                            </button>
                            <div className='dropdown-container'>
                                <li className='user-info-li'>
                                    <i className="fa-regular fa-user"></i>
                                    User Info
                                </li>
                                <li className='user-logout-li'>
                                    <Link to="/profile" onClick={handleLogout}>Logout</Link>
                                </li>
                            </div>

                        </div>
                    
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