import { Link } from 'react-router-dom'
import { useAuth } from '../../utils/useAuth'

export const NavBar = () => {
    const { userData } = useAuth();
    console.log('user in nav bar', userData)

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