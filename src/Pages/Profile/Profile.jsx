import { Outlet, Link, useOutletContext } from 'react-router-dom';

export const Profile = () => {
    const { setToken } = useOutletContext()
    

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
            <Outlet context={{
                setToken,
            }}/>
        </div>
    )
}

