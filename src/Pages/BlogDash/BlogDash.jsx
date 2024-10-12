import { useLoaderData, useRouteLoaderData } from "react-router-dom"
import { useState } from "react"
import { PostList } from "../../Components/PostList/PostList"

import dashStyles from "./blogDash.module.css"

export const BlogDash = () => {
    const message = useLoaderData()
    console.log(message)
    const publicPosts = useRouteLoaderData("root")
    console.log('prev loaded data', publicPosts)

    const [activeList, setList] = useState(publicPosts)

    function handleSwitch(e) {

    }

    // maybe set up state variable to determine which set of posts are
    // "active", which gets switched on button click

    // create a PostList Component and use it twice below, one for public posts,
    // one for all posts
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
                    
                    />
                </div>
            </section>
            <section className={dashStyles.addPostSection}>

            </section>
        </div>
    )
}