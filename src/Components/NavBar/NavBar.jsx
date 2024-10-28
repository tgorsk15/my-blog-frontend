import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../utils/useAuth'

import '../../App.css'

export const NavBar = () => {
    const { logout, pageLoading, setPageLoading } = useAuth();
    const userData = JSON.parse(localStorage.getItem('user'))
    console.log('user in nav bar', userData)
    const navigate = useNavigate()

    async function handleLogout() {
        await logout()
        // navigate("/profile/login")
    }

    async function handleHomeClick() {
        // setPageLoading(true)
        // navigate("/home")
        // setPageLoading(false)
    }

    async function handleHubClick() {
        // setPageLoading(true)
        
        // setTimeout(() => {
        //     setPageLoading(false)
        // }, 1000)
        // navigate("/blogDash")
    }


    return (
        <nav className='navbar-section'>
            <h2>Tgorsk's Blog</h2>
            <div className='links-container'>
                {userData && userData.isAuthor === true && (
                    <h2>Hi {userData.firstName}</h2>
                )}
                <ul className='nav-links'>
                    {userData && (
                        <li>
                            <Link to="/home">Home</Link>
                        </li>
                    )}
                    {userData && userData.isAuthor && (
                        <li>
                            {/* <Link to="/blogDash">Author Hub</Link> */}
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

// left off here: look at Claude'response and 
// modify some things to see if this fixes the issue