import { useLoaderData, useRouteLoaderData } from "react-router-dom"
import { useState } from "react"
import { PostList } from "../../Components/PostList/PostList"

import dashStyles from "./blogDash.module.css"

export const BlogDash = () => {
    const allPosts = useLoaderData()
    console.log('all posts loaded:', allPosts)
    const publicPosts = useRouteLoaderData("root")
    console.log('prev loaded public', publicPosts)

    const [activeList, setList] = useState(publicPosts)

    function handleSwitch(e) {
        const value = e.target.innerText
        if (value === "All") {
            setList(allPosts)
        } else if (value === "Public") {
            setList(publicPosts)
        }
    }

    // maybe set up state variable to determine which set of posts are
    // "active", which gets switched on button click

    return (
        <div className={dashStyles.blogDashPage}>
            <section className={dashStyles.postsSection}>
                <h1>My Posts</h1>
                <div className={dashStyles.selectContainer}>
                    <button onClick={handleSwitch}>
                        Public
                    </button>
                    <button onClick={handleSwitch}>
                        All
                    </button>
                </div>
                {/* use conditional with activeList here */}
                <div className={dashStyles.listContainer}>
                    <PostList 
                        postList = {activeList}
                    />
                </div>
            </section>
            <section className={dashStyles.addPostSection}>

            </section>
        </div>
    )
}