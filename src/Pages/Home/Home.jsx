import { useOutletContext, useNavigate, useLoaderData } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../../utils/useAuth"

import { BlogItem } from "../../Components/BlogItem/BlogItem"
import homeStyles from "./home.module.css"

export const Home = () => {
    const postsList = useLoaderData()
    // console.log('here is postlist:', postsList)

    const { userData, token } = useAuth()
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