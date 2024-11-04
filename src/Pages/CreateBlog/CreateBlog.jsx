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

    async function handlePost(title, content, preview) {
        const token = localStorage.getItem('token')
        const userId = userData.id
        console.log(userId)

        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json", "Authorization": token},
            body: JSON.stringify({
                title,
                content,
                preview,
                userId
            })
        }

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

        let contentPreview = contentRef.current.getContent({format: 'text'})
        const preview = contentPreview.substr(0, 75) + '...'
        console.log('here is preview feature:', preview)
 
        if (title && content && preview) {
            await handlePost(title, content, preview)
            navigate("/blogDash")
        }
    }


    return (
        <section className={blogStyles.createBlogPage}>
            <div className={blogStyles.blogContainer}>
                <h2>Create Your Blog</h2>
                <form 
                    onSubmit={handleSubmit}
                    className={blogStyles.createBlogForm}
                >
                    <label htmlFor="postName">Title:</label>
                    <input 
                        type="text"
                        name="postName"
                        className={blogStyles.postTitle}
                    />

                    <label htmlFor="postContent">Post Body:</label>
                    <PostEditor
                        contentRef= {contentRef}
                    />

                    <button className={blogStyles.createBtn}>
                        Add Post
                    </button>
                </form>
            </div>
        </section>
    )

}