import { useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { getEnvVariable } from "../../utils/apiSetter"

import profileStyles from "../Profile/profile.module.css"

export const SignUp = () => {
    const [signupError, setSignupError] = useState('')
    const navigate = useNavigate()

    const { handlePageChange } = useOutletContext()
    handlePageChange(false)

    async function handleSignup(e) {
        e.preventDefault()
        const formData = new FormData(e.target);
        const firstName = formData.get('firstName')
        const lastName = formData.get('lastName')
        const email = formData.get('userEmail')
        const username = formData.get('username')
        const password = formData.get('password')

        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                username,
                password
            })
        }

        try {
            const apiUrl = getEnvVariable()
            const response = await fetch(`${apiUrl}/user/signup`, options)
            const data = await response.json()
            console.log('response from sign up:', data)

            if (!response.ok) {
                console.log('not ok')
                setSignupError(data.msg)

            } else {
                // navigate to profile page from here
                navigate("/profile")
            }

        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div>
            {signupError !== '' && (
                <div>
                    <h3>
                        {signupError}
                    </h3>
                </div>
            )}

            <form onSubmit={handleSignup}>
                <div className={profileStyles.nameInfoContainer}>
                    <label htmlFor="firstName">First Name:</label>
                    <input 
                        type="text" 
                        name="firstName"
                    />

                    <label htmlFor="lastName">Last Name:</label>
                    <input 
                        type="text" 
                        name="lastName"
                    />
                </div>
                <div className={profileStyles.userInfoContainer}>
                    <label htmlFor="userEmail">Email</label>
                    <input 
                        type="email"
                        name="userEmail"
                    />

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
                </div>
                

                <button type="submit">Sign Up</button>
            </form> 
        </div>
    )
}