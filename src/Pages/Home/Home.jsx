import { useNavigate, useLoaderData, useRouteLoaderData } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../../utils/useAuth"
import { isTokenExpired } from "../../utils/checkExpire"

import { BlogItem } from "../../Components/BlogItem/BlogItem"
import homeStyles from "./home.module.css"

export const Home = () => {
    console.log('is this loading?')
    const postsList = useLoaderData()
    
    // call isExpired() function here
    // ... if expired, maybe just pull the logout()
    // function from useAuth, and then call it to kick user out

    const { logout } = useAuth()
    const token = localStorage.getItem('token')
    const userData = JSON.parse(localStorage.getItem('user'))
    console.log('user and token info:', userData, token)

    // if token is expired, log user out:
    // const tokenExp = isTokenExpired(token)
    // if (tokenExp) {
    //     logout()
    // }

    return (
        <div>
            <section className={homeStyles.postsSection}>
                {postsList.length > 0 ? (
                    postsList.map((post) => {
                        return (
                            <BlogItem
                                key ={post.id} 
                                post={post}
                            />
                        )
                        
                    })

                    
                ) : (
                    <p>hi</p>
                )}
            </section>
        </div>
    )
}