import { useOutletContext } from "react-router-dom"

export const Login = () => {
    const { setToken } = useOutletContext

    function handleLogIn(e) {
        e.preventDefault()

        const formData = new FormData(e.target);
        const username = formData.get('username')
        const password = formData.get('password')
        console.log(username, password)

        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json"}
        }
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