import { useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { getEnvVariable } from "../../utils/apiSetter"
import { FormError } from "../../Components/FormError/FormError"

import profileStyles from "../Profile/profile.module.css"

export const SignUp = () => {
    const [signupError, setSignupError] = useState('')
    const [infoErrors, setInfoErrors] = useState([])
    const navigate = useNavigate()

    const { handlePageChange, isLoading, setLoading } = useOutletContext()
    handlePageChange(false)
    

    async function handleSignup(e) {
        e.preventDefault()
        setLoading(true)
        setInfoErrors([])

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
                setLoading(false)
                console.log('not ok')
                setSignupError(data.msg)
                if (data.errors) {
                    console.log('setting form errors', data.errors)
                    setInfoErrors(data.errors)
                }

            } else {
                // navigate to profile page from here
                setLoading(false)
                navigate("/profile/login")
            }

        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className={profileStyles.signupSection}>
            {signupError !== '' && (
                <div className={profileStyles.signupErrContainer}>
                    <h3>
                        {signupError}
                    </h3>
                </div>
            )}

            <form onSubmit={handleSignup} className={profileStyles.signupForm}>
                <h2 className={profileStyles.signupTitle}>Create an Account</h2>
                <div className={profileStyles.nameInfoContainer}>
                    <input 
                        type="text" 
                        name="firstName"
                        placeholder="First Name"
                        required
                    />

                    <input 
                        type="text" 
                        name="lastName"
                        placeholder="Last Name"
                        required
                    />
                </div>
                <div className={profileStyles.userInfoContainer}>
                    <input 
                        type="email"
                        name="userEmail"
                        placeholder="Email"
                        required
                    />

                    <input 
                        type="text"
                        name="username"
                        placeholder="Username"
                        className=""
                        required
                    />

                    <input 
                        type="text"
                        name="password"
                        placeholder="Password"
                        className=""
                        required
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
                    className={profileStyles.signupBtn}
                >
                    Sign Up
                </button>
            </form>
            {infoErrors.length > 0 && (
                <FormError
                    infoErrors= {infoErrors}
                />
            )} 
        </div>
    )
}