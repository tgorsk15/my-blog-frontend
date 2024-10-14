import { useLoaderData, useRouteLoaderData } from "react-router-dom"
import { useState } from "react"
import { getAllPosts } from "../../utils/loaders"
import { PostList } from "../../Components/PostList/PostList"

import dashStyles from "./blogDash.module.css"

export const BlogDash = () => {
    const initialAllPosts = useLoaderData()
    const initialPublicPosts = useRouteLoaderData("root")
    console.log('all posts loaded:', initialAllPosts)
    console.log('prev loaded public', initialPublicPosts)

    const [allPosts, setAllPosts] = useState(initialAllPosts)
    const [publicPosts, setPublicPosts] = useState(initialPublicPosts)
    const [activeList, setActive] = useState(publicPosts)
    const [activeType, setType] = useState("public")

    function handleSwitch(e) {
        // change state of what active list is being shown
        const value = e.target.innerText
        if (value === "All") {
            setActive(allPosts)
            setType("all")
        } else if (value === "Public") {
            setActive(publicPosts)
            setType("public")
        }
    }

    async function handleListChange() {
        // change state of allPosts here
        // take the new allPosts and filter, to create new public list
        // then, set state of publicposts to this new filtered list
        const newList = await getAllPosts();
        const filteredPosts = newList.filter(post => post.published === true)
        setAllPosts(newList);
        setPublicPosts(filteredPosts)

        if (activeType === "public") {
            setActive(filteredPosts)
        } else if (activeType === "all") {
            setActive(newList)
        }

        console.log('does it get this far?')

    }


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
                <div className={dashStyles.listContainer}>
                    <PostList 
                        activeList = {activeList}
                        setActive = {setActive}
                        handleListChange = {handleListChange}
                    />
                </div>
            </section>
            <section className={dashStyles.addPostSection}>

            </section>
        </div>
    )
}