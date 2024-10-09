import { getEnvVariable } from "./apiSetter"

export const getPublicPosts = async () => {
    const token = localStorage.getItem('token')
    console.log(token)
    const options = {
        method: "GET",
        headers: {"Content-Type": "application/json", "Authorization": token},
        // body: JSON.stringify({
        //     token
        // })
    }

    try {
        const apiUrl = getEnvVariable()
        console.log(apiUrl)

        const response = await fetch(`${apiUrl}/post/viewAllPublished`, options)
        const data = await response.json()
        console.log(data)
        const posts = data.posts
        console.log('posts in loader:', posts)

        if (!response.ok) {
            console.log('not ok')
        } else {
            return posts
        }

        

    } catch(err) {
        console.log(err)
    }
}

export const getSinglePost = async ({ params }) => {
    console.log('gabgoogabgoogabgoo')
    const token = localStorage.getItem('token')
    const { postId } = params
    console.log('chosenId:', postId)

    console.log(token)
    const options = {
        method: "GET",
        headers: {"Content-Type": "application/json", "Authorization": token},
        // body: JSON.stringify({
        //     token
        // })
    }


    try {
        const apiUrl = getEnvVariable()

        const response = await fetch(`${apiUrl}/post/view/${postId}`, options)
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