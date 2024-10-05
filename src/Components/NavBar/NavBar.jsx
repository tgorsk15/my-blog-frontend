import { Link } from 'react-router-dom'

export const NavBar = () => {
    return (
        <div>
            hi NavBar
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                {/* Add other navigation links as needed */}
            </ul>
        </div>
    )
}