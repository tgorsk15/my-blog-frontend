import { useLoaderData } from "react-router-dom"
// import { useState } from "react"
import { useAuth } from "../../utils/useAuth"

import { BlogItem } from "../../Components/BlogItem/BlogItem"
import { Search } from "../../Components/Search/Search"
import homeStyles from "./home.module.css"

export const Home = () => {
    const postsList = useLoaderData()
    const { pageLoading } = useAuth()
    // const token = localStorage.getItem('token')
    // const userData = JSON.parse(localStorage.getItem('user'))

    return (
        // TMW 10/29: start building this page out
        // on right side I will have search bar (include reset button),
        // and Git/phone number info
        // on left the user will be able to toggle between "All" and "Latest"
        // will probably have to create a loading animation on switching between these two
        <section className={homeStyles.homePage}>
            <section className={homeStyles.topHomeSection}>
                <h2>Check out My Posts</h2>
                <div className={homeStyles.postSelectionBox}>
                    <button className={homeStyles.defaultPostsBtn}>
                        All Posts
                    </button>
                    <button className={homeStyles.latestPostsBtn}>
                        Latest Posts
                    </button>
                </div>
            </section>
            <section className={homeStyles.bottomHomeSection}>
                <div className={homeStyles.leftSide}>
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
                            <h2>There is nothing published currently</h2>
                        )}
                    </div> 
                </div>
                <div className={homeStyles.rightSide}>
                    {/* this will contain search bar, author info */}
                    <Search
                    
                    />
                    <div className={homeStyles.infoContainer}>
                        Hi I'm info
                    </div>
                </div> 
                

            </section>
        </section>
    )
}

