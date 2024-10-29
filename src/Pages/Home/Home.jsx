import { useLoaderData } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../../utils/useAuth"

import { BlogItem } from "../../Components/BlogItem/BlogItem"
import { Search } from "../../Components/Search/Search"
import homeStyles from "./home.module.css"

export const Home = () => {
    const postsList = useLoaderData()
    console.log('here is postsList:', postsList)
    const { pageLoading } = useAuth()
    // const token = localStorage.getItem('token')
    // const userData = JSON.parse(localStorage.getItem('user'))
    const [activeList, setList] = useState(postsList)
    // loading is true when clicking All or latest below:
    const [homeLoading, setLoading] = useState(false)

    function handleGetAll() {
        setList(postsList)
    }

    function handleGetLatest() {
        // ask CLaude how to sort the dates
    }

    return (
        <section className={homeStyles.homePage}>
            <section className={homeStyles.topHomeSection}>
                <h2>Check out My Posts</h2>
                <div className={homeStyles.postSelectionBox}>
                    <button 
                        className={homeStyles.defaultPostsBtn}
                        onClick={handleGetAll}
                    >
                        All Posts
                    </button>
                    <button 
                        className={homeStyles.latestPostsBtn}
                        onClick={handleGetLatest}
                    >
                        Latest Posts
                    </button>
                </div>
            </section>
            <section className={homeStyles.bottomHomeSection}>
                <div className={homeStyles.leftSide}>
                    {/* put in another coniditional here for when loading */}
                    <div className={homeStyles.postsSection}>
                        {activeList.length > 0 ? (
                            activeList.map((post) => {
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

