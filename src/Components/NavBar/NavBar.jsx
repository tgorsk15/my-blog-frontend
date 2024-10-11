import { Link } from 'react-router-dom'

export const NavBar = () => {
    return (
        <div>
            hi NavBar
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li> 
            </ul>
        </div>
    )
}