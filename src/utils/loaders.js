import { getEnvVariable } from "./apiSetter"

export const getAllPosts = async () => {
    const token = localStorage.getItem('token')
    console.log('token', token)
    const options = {
        method: "GET",
        headers: {"Content-Type": "application/json", "Authorization": token},
    }

    try {
        const apiUrl = getEnvVariable()
        const response = await fetch(`${apiUrl}/post/getAll`, options)
        const data = await response.json()
        
        if (!response.ok) {
            console.log('not ok')
            return null
        } else {
            return data.posts
        }

    } catch(err) {
        console.log(err)
    }
}

export const getPublicPosts = async () => {
    const token = localStorage.getItem('token')
    console.log('token', token)

    // prevent user from accessing home and loading data if not logged in:
    // if (token === null) {

    // }

    const options = {
        method: "GET",
        headers: {"Content-Type": "application/json", "Authorization": token},
    }

    try {
        const apiUrl = getEnvVariable()

        const response = await fetch(`${apiUrl}/post/viewAllPublished`, options)
        const data = await response.json()
        // console.log(data)
        const posts = data.posts

        if (!response.ok) {
            console.log('not ok')
            return null
        } else {
            return posts
        }

        

    } catch(err) {
        console.log(err)
    }
}

export const getSinglePost = async ({ params }) => {
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
        console.log('post in loader function', data)

        if (!response.ok) {
            console.log('not ok')
            return null
        } else {
            return data.post
        }
        

    } catch(err) {
        console.log(err)
    }
}

