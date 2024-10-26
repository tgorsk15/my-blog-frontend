import { Outlet, Link, useOutletContext } from 'react-router-dom';
import profileStyles from "./profile.module.css";

export const Profile = () => {
    const { setToken } = useOutletContext()
    

    return (
        <section className={profileStyles.profileSection}>
            <h1>Welcome to My Blog!</h1>

                

            <Outlet context={{
                setToken,
            }}/>
<           div className={profileStyles.userOptionsContainer}>
                {/* <h4>
                    <Link to='/profile/login'>Sign in </Link>
                </h4> 
                <p>or</p> */}
                <h4>Need an Account?</h4>
                <h4>
                    <Link to="/profile/signup" >Sign Up </Link> today!
                </h4>
            </div>
        </section>
    )
}

