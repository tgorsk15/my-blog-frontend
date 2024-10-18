import { useLoaderData } from "react-router-dom"
import { useRef, useState } from "react";

import { PostEditor } from "../../Components/Editor/Editor";
import blogStyles from "./blogEditor.module.css";

export const EditBlog = () => {
    const post = useLoaderData()
    console.log(post)

    const titleRef = useRef(post.title)
    const contentRef = useRef(post.content);
    console.log('reference to content', contentRef)

    // const [title, setTitle] = useState(post.title)

    // ...might be an issue in being able to view the original HTML script inside
    // of the MCE Editor
    // ^^ maybe set up some sort of conditional that checks if editor is in "edit"
    // mode as opposed to "create" mode -> can set up a state variable for this,
    // then pass down as a prop

    function handleSubmitChanges() {

    }

    return (
        
        <>
        
        <section className={blogStyles.editBlogPage}>
            <h2>Edit Blog</h2>
            <form action="" onSubmit={handleSubmitChanges}>
                <label htmlFor="postName">Title:</label>
                <input 
                    type="text"
                    name="postName"
                    defaultValue={post.title}
                    // onChange={(e) => {
                    //     setTitle(e.target.value)
                        
                    // }}
                    ref={titleRef}
                    // TMW 10/18: continue setting this up and connecting to
                    // handleSubmitChange, where Refs will change to current value
                    // (follow along with GPT prompt if needed)
                    
                />

                <label htmlFor="postContent">Post Body:</label>
                <PostEditor
                    contentRef= {contentRef}
                />

                <button>Update Post</button>
                
            </form>
            
        </section>
        </>
    )
}