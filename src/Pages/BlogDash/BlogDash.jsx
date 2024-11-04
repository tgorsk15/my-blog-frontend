import { useLoaderData, Link } from "react-router-dom"
import { useState } from "react"
import { getAllPosts } from "../../utils/loaders"
import { PostList } from "../../Components/PostList/PostList"
import { useAuth } from "../../utils/useAuth"

import dashStyles from "./blogDash.module.css"

export const BlogDash = () => {
    const initialAllPosts = useLoaderData()
    const { logout } = useAuth()

    const [allPosts, setAllPosts] = useState(initialAllPosts)
    const [publicPosts, setPublicPosts] = useState(() => 
        initialAllPosts.filter(post => post.published === true)
    )
    const [activeList, setActive] = useState(publicPosts);
    const [activeType, setType] = useState("public");
    const [dashLoading, setDashLoading] = useState(false);

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
        // gather new list of posts, then filter to get new public posts list
        // this logout has no purpose, just have it as a placeholder:
        const newList = await getAllPosts({ logout });
        const filteredPosts = newList.filter(post => post.published === true)
        setAllPosts(newList);
        setPublicPosts(filteredPosts)

        if (activeType === "public") {
            setActive(filteredPosts)
        } else if (activeType === "all") {
            setActive(newList)
        }

    }


    return (
        <div className={dashStyles.blogDashPage}>
            {dashLoading ? (
                <div className={dashStyles.spinnerContainer}>
                    <div className={dashStyles.loadSpinner}>
                </div>    
            </div>
            ) : (
                <>
                    <section className={dashStyles.postsSection}>
                        <h1>My Posts</h1>
                        <div className={dashStyles.selectContainer}>
                            <button 
                                onClick={handleSwitch}
                                className={`{dashStyles.allPostsBtn}
                                    ${activeType === 'all' ? dashStyles.activeBtn : ''}`}
                            >
                                All
                            </button>
                            <button 
                                onClick={handleSwitch}
                                className={`{dashStyles.allPostsBtn}
                                    ${activeType === 'public' ? dashStyles.activeBtn : ''}`}
                            >
                                Public
                            </button>
                        </div>
                        <div className={dashStyles.listContainer}>
                            <PostList 
                                activeList = {activeList}
                                setActive = {setActive}
                                handleListChange = {handleListChange}
                                setDashLoading = {setDashLoading}
                            />
                        </div>
                        
                    </section>
                    <section className={dashStyles.addPostSection}>
                        <div className={dashStyles.createNewContainer}>
                            <div className={dashStyles.createNewBox}>
                                <Link to="/createBlog" className={dashStyles.createBlogLink}>
                                <h2 className={dashStyles.createNewHeader}>Create New</h2>
                                <svg className={dashStyles.addSvg} fill="#FFFFFF" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="101px" height="101px" viewBox="0 0 67.201 67.201" xmlSpace="preserve">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> 
                                    <path d="M46.705,15.232V0H1.904v67.201l22.4-20.16l22.4,20.16V51.969c10.08,0,18.592-8.287,18.592-18.593 C65.297,23.074,56.785,15.232,46.705,15.232z M46.705,48.833c-8.289,0-15.232-6.722-15.232-15.232 c0-8.511,6.72-15.232,15.232-15.232c8.514,0,15.229,6.722,15.229,15.232C61.936,42.113,54.992,48.833,46.705,48.833z">
                                    </path> 
                                    <polygon points="49.393,24.193 43.793,24.193 43.793,30.688 37.297,30.688 37.297,36.512 43.793,36.512 43.793,43.009 49.393,43.009 49.393,36.512 56.112,36.512 56.112,30.688 49.393,30.688 ">
                                    </polygon> </g> </g> </g> </g>
                                </svg>
                                </Link>
                            </div>
                        </div>
                    </section>   
                </>
            )}
            
        </div>
    )
}