import { useOutletContext, useNavigate, useLoaderData } from "react-router-dom"
import { useState } from "react"

import { BlogItem } from "../../Components/BlogItem/BlogItem"
import homeStyles from "./home.module.css"

export const Home = () => {
    const { token } = useOutletContext();
    const postsList = useLoaderData()
    console.log('here is postlist:', postsList)
    console.log(token)

    console.log('here isomponent:', BlogItem)

    return (
        <div>
            hi Home
            <section className={homeStyles.postsSection}>
                {postsList.length > 0 ? (
                    postsList.map((post) => {
                        {console.log('individual', post)}
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