import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../utils/useAuth'

import '../../App.css'
import { useState } from 'react';

export const NavBar = () => {
    const { logout, } = useAuth();
    const userData = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()
    const [navLoading, setLoading] = useState(false)

    async function handleLogout() {
        await logout()
    }

    async function handleNavigate(path) {
        setLoading(true)
        navigate(path)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }


    return (
        <nav className='navbar-section'>
            <h2>Tgorsk's Blog</h2>
            <div className='links-container'>
                {navLoading && (
                    <div className='spinner-container'>
                        <div className='load-spinner'>

                        </div>    
                    </div> 
                )}
                {userData && userData.isAuthor === true && (
                    <h2>Hi {userData.firstName}</h2>
                )}
                <ul className='nav-links'>
                    
                    {userData && (
                        <li>
                            <button
                                className='home-link-btn'
                                onClick={() => handleNavigate('/home')}
                            >
                                Home
                            </button>
                        </li>
                    )}
                    {userData && userData.isAuthor && (
                        <li>
                            <button
                                className='hub-link-btn'
                                onClick={() => handleNavigate('/blogDash')}
                            >
                                Author Hub
                            </button>
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
                                    <Link to="/profile/login" onClick={handleLogout}>Logout</Link>
                                </li>
                            </div>

                        </div>
                    
                    ) : (
                        <li>
                            <Link to="/profile/login">Log In</Link>
                        </li>
                    )}
                     
                </ul>
                
            </div>
            
        </nav>
    )
}