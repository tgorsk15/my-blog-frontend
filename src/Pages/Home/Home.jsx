import { useOutletContext, useNavigate, useLoaderData } from "react-router-dom"
import { useState } from "react"

import { BlogItem } from "../../Components/BlogItem/BlogItem"
import homeStyles from "./home.module.css"

export const Home = () => {
    const { token } = useOutletContext();
    const postsList = useLoaderData()
    console.log('here is postlist:', postsList)
    console.log(token)

    // call upon useLoaderData to load published posts in

    return (
        <div>
            hi Home
            <section className={homeStyles.postsSection}>
                {postsList.length > 0 ? (
                    postsList.map((post) => {
                        <BlogItem 
                            post={post}
                        />
                    })

                    
                ) : (
                    <p>hi</p>
                )}
            </section>
        </div>
    )
}