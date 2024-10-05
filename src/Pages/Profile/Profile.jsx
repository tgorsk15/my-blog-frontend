import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom'

export const Profile = () => {


    return (
        <div>
            <h1>Welcome to Blogger!</h1>
            <div>
                <h4>
                    <Link to='/login'>Sign in </Link> 
                    or 
                    <Link to="/signup" >Sign Up </Link> to continue
                </h4>

            </div>
            <Outlet />
        </div>
    )
}

// left off here... Profile isnot rendering autmatically for some reason on app
// load, however it does navigate there if I click the link in
// the Nav Bar

// need to continue to work on fetching login and getting token back