import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom'

export const Profile = () => {


    return (
        <div>
            <h1>Welcome to Blogger!</h1>
            <div>
                <h4>
                    <Link to='/profile/login'>Sign in </Link> 
                    or 
                    <Link to="/profile/signup" >Sign Up </Link> to continue
                </h4>

            </div>
            <Outlet />
        </div>
    )
}

// need to continue to work on fetching login and getting token back