import { getEnvVariable } from "./apiSetter"

export const getPublicPosts = async () => {
    const token = localStorage.getItem('token')
    console.log(token)
    const options = {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            token
        })
    }

    try {
        const apiUrl = getEnvVariable()
        console.log(apiUrl)

        const response = await fetch(`${apiUrl}/post/viewAllPublished`, options)
        const data = await response.json()
        console.log(data)

        if (!response.ok) {
            console.log('not ok')
        } else {
            return data
        }

        

    } catch(err) {
        console.log(err)
    }
}