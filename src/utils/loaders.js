import { redirect } from "react-router-dom";

import { getEnvVariable } from "./apiSetter"
import { formatDate } from "./formatDate";
import { isTokenExpired } from "./checkExpire";

export const getAllPosts = async ({ logout }) => {
    const token = localStorage.getItem('token')

    const tokenExp = isTokenExpired(token)
    if (tokenExp) {
        logout()
        return redirect('/profile/login')
    }

    
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
            const posts = data.posts
            posts.map((post) => {
                const formattedDate = formatDate(post.createdAt)
                post.createdAt = formattedDate
            })
            return posts
        }

    } catch(err) {
        console.log(err)
    }
}


export const getPublicPosts = async ({ logout }) => {
    const token = localStorage.getItem('token')
    
    const tokenExp = isTokenExpired(token)
    if (tokenExp) {
        logout()
        return redirect('/profile/login')
    }

    console.log('token', token)

    const options = {
        method: "GET",
        headers: {"Content-Type": "application/json", "Authorization": token},
    }

    if (token === null) {
        return
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
            posts.map((post) => {
                const formattedDate = formatDate(post.createdAt)
                post.createdAt = formattedDate
            })
            return posts
        }

        

    } catch(err) {
        console.log(err)
    }
}

export const getSinglePost = async ({ params, logout }) => {
    const token = localStorage.getItem('token')

    const tokenExp = isTokenExpired(token)
    if (tokenExp) {
        logout()
        return redirect('/profile/login')
    }

    
    const { postId } = params
    console.log('chosenId:', postId)

    console.log(token)
    const options = {
        method: "GET",
        headers: {"Content-Type": "application/json", "Authorization": token},
    }


    try {
        const apiUrl = getEnvVariable()

        const response = await fetch(`${apiUrl}/post/view/${postId}`, options)
        const data = await response.json()
        console.log('post in loader function', data)

        const commentsArray = data.post.comments

        if (!response.ok) {
            console.log('not ok')
            return null
        } else {
            commentsArray.forEach(comment => {
                const newDate = formatDate(comment.createdAt)
                comment.createdAt = newDate
            });
            return data.post
        }
        

    } catch(err) {
        console.log(err)
    }
}

export const getSinglePostById = async (postId) => {
    const token = localStorage.getItem('token')
    
    const options = {
        method: "GET",
        headers: {"Content-Type": "application/json", "Authorization": token},
    }


    try {
        const apiUrl = getEnvVariable()

        const response = await fetch(`${apiUrl}/post/view/${postId}`, options)
        const data = await response.json();
        const commentsArray = data.post.comments;

        if (!response.ok) {
            console.log('not ok')
            return null
        } else {
            commentsArray.forEach(comment => {
                const newDate = formatDate(comment.createdAt)
                comment.createdAt = newDate
            });
            return data.post
        }
        

    } catch(err) {
        console.log(err)
    }
}


// old method for isTokenExpired check:
// const tokenExp = isTokenExpired(token)
// if (tokenExp) {
//     localStorage.removeItem('token');  // Clear token
//     localStorage.removeItem('user');   // Clear user data
//     return redirect('/profile/login')
// }
