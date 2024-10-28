import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import profileStyles from "./profile.module.css";

export const Profile = () => {
    const [onLogin, setLogin] = useState(true)
    const [isLoading, setLoading] = useState(false)
    
    function handlePageChange(pageBoolean) {
        pageBoolean === onLogin ? null : (
            setLogin(pageBoolean)
        )
    }

    return (
        <section className={profileStyles.profileSection}>
            <h1>Welcome to My Blog!</h1>

                

            <Outlet context={{
                handlePageChange,
                isLoading,
                setLoading
            }}/>         
            {onLogin ? (
                <div className={profileStyles.userOptionsContainer}>
                    <h4>Need an Account?</h4>
                    <h4>
                        <Link to="/profile/signup" >Sign Up </Link> today!
                    </h4>
                </div>
            ) : (
                <div className={profileStyles.userOptionsContainer}>
                    <h4>Already have an Account?</h4>
                    <h4>
                        <Link to="/profile/login" >Sign in </Link>
                    </h4>
                </div>
            )}
              
            
        </section>
    )
}

