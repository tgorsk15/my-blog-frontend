import { useNavigate, useLoaderData, useRouteLoaderData } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../../utils/useAuth"

import { BlogItem } from "../../Components/BlogItem/BlogItem"
import homeStyles from "./home.module.css"

export const Home = () => {
    const postsList = useLoaderData()
    const { pageLoading, setPageLoading} = useAuth()
    const token = localStorage.getItem('token')
    const userData = JSON.parse(localStorage.getItem('user'))
    // console.log('user and token info:', userData, token)

    return (
        
        <section className={homeStyles.homePage}>
            {pageLoading ? (
                <div className={homeStyles.spinnerContainer}>
                    <div className={homeStyles.loadSpinner}>
                        Hi Im Loading
                    </div>    
                </div>
            ) : (
                <div className={homeStyles.postsSection}>
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
                        <p>There is nothing published currently</p>
                    )}
                </div>    
            )}
            

        </section>
    )
}

