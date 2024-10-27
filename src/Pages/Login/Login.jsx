import { useNavigate, useOutletContext } from "react-router-dom"
import { getEnvVariable } from "../../utils/apiSetter"
import { useState } from "react"
import { useAuth } from "../../utils/useAuth"
import PropTypes from "prop-types"

import profileStyles from "../Profile/profile.module.css"

export const Login = ({ changeUser }) => {
    const [loginError, setLoginError] = useState('')
    const navigate = useNavigate()

    const { login } = useAuth()
    const { handlePageChange, isLoading, setLoading } = useOutletContext()

    handlePageChange(true)

    async function handleLogIn(e) {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.target);
        const username = formData.get('username')
        const password = formData.get('password')

        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username,
                password
            })
        }

        try {
            const apiUrl = getEnvVariable()
            const response = await fetch(`${apiUrl}/user/login`, options)
            const data = await response.json()

            if (!response.ok) {
                console.log('not ok')
                setLoginError(data.msg)
            } else {
                // trigger login with context provider
                const newUser = await login(data)
                // this will re-render App, and bring user to Home on Login
                setTimeout(() => {
                    changeUser(newUser)
                }, 1400)
                navigate("/home")
            }
            

        } catch(error) {
            console.error('hitting error in login:', error)
        }
    }

    return (
        <div className={profileStyles.loginSection}>
            {loginError !== '' && (
                <div>
                    <h3>
                        {loginError}
                    </h3>
                </div>
            )}

            <form 
                onSubmit={handleLogIn} 
                className={`${profileStyles.loginForm} ${isLoading ? profileStyles.submitted : ''}`}>
                <h2 className={profileStyles.signinTitle}>Sign In</h2>
                <div className={profileStyles.usernameSection}>
                    <input 
                        type="text"
                        name="username"
                        placeholder="Username"
                        className=""
                    />
                </div>
                <div className={profileStyles.passwordSection}>
                    <input 
                        type="text"
                        name="password"
                        placeholder="Password"
                        className=""
                    />
                </div>
                {isLoading && (
                    <div className={profileStyles.spinnerContainer}>
                        <div className={profileStyles.loadSpinner}>

                        </div>    
                    </div>    
                )}
                
                <button 
                    type="submit" 
                    className={profileStyles.loginBtn}
                >
                    Log In
                </button>
            </form> 
        </div>
        
    )
}

Login.propTypes = {
    changeUser: PropTypes.func,
}