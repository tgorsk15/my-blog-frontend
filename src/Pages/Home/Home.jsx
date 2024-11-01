import { useLoaderData } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../../utils/useAuth"
import { sortPostsByDate } from "../../utils/sortDates"

import { BlogItem } from "../../Components/BlogItem/BlogItem"
import { Search } from "../../Components/Search/Search"

import noResults from "../../../assets/no-results.png"
import homeStyles from "./home.module.css"

export const Home = () => {
    const postsList = useLoaderData()
    const [activeList, setList] = useState(postsList)
    // loading is true when clicking All or latest below:
    const [homeLoading, setLoading] = useState(false)
    const authorPhone = "+1-630-589-2026";
    const authorEmail = "tgorsk352@gmail.com";

    function handleGetAll() {
        setList(postsList)
    }

    function handleGetLatest() {
        const listCopy = activeList;
        const latestPosts = sortPostsByDate(listCopy)
        setList(latestPosts)
        console.log('updated active list', activeList)
    }

    // need to add sliding animations to the two buttons
    return (
        <section className={homeStyles.homePage}>
            <section className={homeStyles.topHomeSection}>
                <h2>Check out</h2>
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
                            <div className={homeStyles.emptyPosts}>
                                <img src={noResults} alt="no results icon" />  
                                <h2>No results were found</h2>

                            </div>
                        )}
                    </div> 
                </div>
                <div className={homeStyles.rightSide}>
                    {/* contains search bar, author info */}
                    <Search
                        postsList = {postsList}
                        setList = {setList}
                        handleGetAll = {handleGetAll}
                    />
                    <div className={homeStyles.infoContainer}>
                        <h2 className={homeStyles.contactTitle}>Contact:</h2>
                        <div className={homeStyles.githubBox}>
                            <h3>
                                <a href={import.meta.env.VITE_GITHUB_URL}
                                    className={homeStyles.githubLink}
                                >
                                    <i className="devicon-github-original"></i>
                                    tgorsk15
                                </a>
                            </h3>
                        </div>
                        <div className={homeStyles.phoneEmailBox}>
                            <h3>Phone: {authorPhone}</h3>
                            <h3>Email: {authorEmail}</h3>
                        </div>
                    </div>
                </div> 
                

            </section>
        </section>
    )
}

