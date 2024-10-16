import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import { getEnvVariable } from "../../utils/apiSetter"
import { PostEditor } from "../../Components/Editor/Editor"

import blogStyles from "../EditBlog/blogEditor.module.css"

export const CreateBlog = () => {
    const contentRef = useRef(null);

    const { userData } = useAuth()
    const navigate = useNavigate()

    async function handlePost(title, content) {
        const token = localStorage.getItem('token')
        const userId = userData.id
        console.log(userId)

        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json", "Authorization": token},
            body: JSON.stringify({
                title,
                content,
                userId
            })
        }

        // left off here
        // going to have to change format of backend function on
        // how it handles the body data

        try {
            const apiUrl = getEnvVariable()
            const response = await fetch(`${apiUrl}/post/create`, options)
            const data = await response.json();
            console.log('new post data', data.createdPost);

        } catch(err) {
            console.log(err)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData(e.target);
        const title = formData.get('postName')
        let content = contentRef.current.getContent()
        console.log(content)
        console.log(title)
        // remove <p> tags:
        // content = content.replace(/^<p>(.*)<\/p>$/, '$1');

        // actually, the content has to be kept with its html tags... 
        if (title && content) {
            await handlePost(title, content)
            navigate("/blogDash")
        }
    }


    // on submit, need to post the new data to the API (need to send userId as well)
    // afterwards, redirect to BlogDash (should show new post)

    return (
        <section className={blogStyles.createBlogPage}>
            <h2>New Blog</h2>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="postName">Title:</label>
                <input 
                    type="text"
                    name="postName"
                />

                <label htmlFor="postContent">Post Body:</label>
                <PostEditor
                    contentRef= {contentRef}
                />

                <button>Add Post</button>
                
            </form>
            
        </section>
    )

}