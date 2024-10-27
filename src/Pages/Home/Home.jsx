import { useNavigate, useLoaderData, useRouteLoaderData } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../../utils/useAuth"

import { BlogItem } from "../../Components/BlogItem/BlogItem"
import homeStyles from "./home.module.css"

export const Home = () => {
    const postsList = useLoaderData()
    const { logout } = useAuth()
    const token = localStorage.getItem('token')
    const userData = JSON.parse(localStorage.getItem('user'))
    console.log('user and token info:', userData, token)

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

