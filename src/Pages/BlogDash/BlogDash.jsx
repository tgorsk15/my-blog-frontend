import { useLoaderData, useRouteLoaderData, useRevalidator } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { getAllPosts } from "../../utils/loaders"
import { PostList } from "../../Components/PostList/PostList"

import dashStyles from "./blogDash.module.css"

export const BlogDash = () => {
    const initialAllPosts = useLoaderData()
    const initialPublicPosts = useRouteLoaderData("root")
    console.log('all posts loaded:', initialAllPosts)
    console.log('prev loaded public', initialPublicPosts)
    // const revalidator = useRevalidator();

    const [allPosts, setAllPosts] = useState(initialAllPosts)
    const [publicPosts, setPublicPosts] = useState(initialPublicPosts)
    const [activeList, setActive] = useState(publicPosts)
    const [activeType, setType] = useState("public")
    // const [activeType, setActiveType] = useState("Public")

    // const allPostsRef = useRef(allPosts)
    // const publicPostsRef = useRef(publicPosts)

    // useEffect(() => {
    //     allPostsRef.current = allPosts
    //     publicPostsRef.current = publicPosts
    // }, [allPosts, publicPosts])

    // useEffect(() => {
    //     // setActive(activeType === "All" ? allPostsRef.current : publicPostsRef.current)
    //     setActive(activeType === "All" ? allPosts : publicPosts)
    // }, [activeType])

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

        // setActiveType(value)
    }

    async function handleListChange(buttonText) {
        
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

        
        // revalidator.revalidate();
        console.log('does it get this far?')
        // if (buttonText === 'Publish') {
        //     console.log('button text in function:', buttonText)
        //     console.log('newAllPosts list in function:', allPosts)
        //     setActive(allPosts)
        // } else {
        //     console.log('button text in function:', buttonText)
        //     console.log('new PublicPosts list in function:', publicPosts)
        //     setActive(publicPosts)
        // }
        // setActiveType(buttonText === 'Publish' ? 'All' : 'Public')

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
                {/* use conditional with activeList here */}
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