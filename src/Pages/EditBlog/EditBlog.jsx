import { useLoaderData, useNavigate } from "react-router-dom"
import { useRef, useState } from "react";
import { getEnvVariable } from "../../utils/apiSetter"
import { PostEditor } from "../../Components/Editor/Editor";

import blogStyles from "./blogEditor.module.css";

export const EditBlog = () => {
    const post = useLoaderData()
    const navigate = useNavigate();

    const titleRef = useRef(post.title)
    const contentRef = useRef(post.content);
    console.log('reference to content', contentRef)

    function handleSubmitClick(e) {
        e.preventDefault()

        const newTitle = titleRef.current.value
        const newContent = contentRef.current.getContent()
        console.log('here is new content', newContent)

        // for displaying on Home screen
        const contentText = contentRef.current.getContent({format: 'text'})
        console.log('content in text form:', contentText)
        post.contentPreview = contentText
        console.log(post.contentPreview)

        handleUpdatePost(newTitle, newContent)
    }

    async function handleUpdatePost(newTitle, newContent) {
        // left off here... start building this out
        const token = localStorage.getItem('token')
        const postId = post.id

        const options = {
            method: "PUT",
            headers: {"Content-Type": "application/json", "Authorization": token},
            body: JSON.stringify({
                newTitle,
                newContent
            })
        }

        try {
            const apiUrl = getEnvVariable();
            const response = await fetch(`${apiUrl}/post/edit/${postId}`, options)

            navigate("/blogDash")
        } catch(err) {
            console.log(err)
        }
        
    }

    return (
        
        <>
        
        <section className={blogStyles.editBlogPage}>
            <h2>Edit Blog</h2>
            <form action="" onSubmit={handleSubmitClick}>
                <label htmlFor="postName">Title:</label>
                <input 
                    type="text"
                    name="postName"
                    defaultValue={post.title}
                    ref={titleRef}
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