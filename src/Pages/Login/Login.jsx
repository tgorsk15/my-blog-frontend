import { useOutletContext } from "react-router-dom"
import { getEnvVariable } from "../../utils/apiSetter"

export const Login = () => {
    const { setToken } = useOutletContext

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
            const result = getEnvVariable()
            console.log(result)
            // const response = await fetch("api url placeholder", options)

            // if (!response.ok) {
            //     throw new Error('Request failed');
            // }


        } catch(error) {
            console.log(error)
        }

            // TMW 10/6: Finish building this function and figure out how to
            // incorporate localStorage and send a token to the backend

            // need to somehow check when token runs out and then remove
            // the token info from localStorage

    }

    return (
        <div>
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