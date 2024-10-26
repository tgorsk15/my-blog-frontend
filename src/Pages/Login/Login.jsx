import { useNavigate } from "react-router-dom"
import { getEnvVariable } from "../../utils/apiSetter"
import { useState } from "react"
import { useAuth } from "../../utils/useAuth"
import PropTypes from "prop-types"

export const Login = ({ changeUser }) => {
    const [loginError, setLoginError] = useState('')
    const navigate = useNavigate()

    const { login } = useAuth()

    async function handleLogIn(e) {
        e.preventDefault()

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
                }, 1200)
                navigate("/home")
            }
            

        } catch(error) {
            console.error('hitting error in login:', error)
        }
    }

    return (
        <div>
            {loginError !== '' && (
                <div>
                    <h3>
                        {loginError}
                    </h3>
                </div>
            )}

           <form onSubmit={handleLogIn}>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text"
                    name="username"
                    className=""
                />

                <label htmlFor="password">Password:</label>
                <input 
                    type="text"
                    name="password"
                    className=""
                />

                <button type="submit">Log In</button>
            </form> 
        </div>
        
    )
}

Login.propTypes = {
    changeUser: PropTypes.func,
}