import { useOutletContext } from "react-router-dom"
import { getEnvVariable } from "../../utils/apiSetter"
import { useState } from "react"

export const Login = () => {
    const { setToken } = useOutletContext

    const [loginError, setLoginError] = useState('')

    async function handleLogIn(e) {
        e.preventDefault()

        const formData = new FormData(e.target);
        const username = formData.get('username')
        const password = formData.get('password')
        console.log(username, password)

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
            console.log(apiUrl)
            const response = await fetch(`${apiUrl}/user/login`, options)
            const data = await response.json()
            console.log(data)

            if (!response.ok) {
                console.log('not ok')
                // throw new Error('Request failed');
                setLoginError(data.msg)
            }
            


        } catch(error) {
            console.log(error)
        }

            // need to somehow check when token runs out and then remove
            // the token info from localStorage

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