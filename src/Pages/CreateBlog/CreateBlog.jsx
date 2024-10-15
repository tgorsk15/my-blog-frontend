import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PostEditor } from "../../Components/Editor/Editor"

import blogStyles from "../EditBlog/blogEditor.module.css"

export const CreateBlog = () => {
    const contentRef = useRef(null);

    function handleSubmit(e) {
        

        e.preventDefault()

        const formData = new FormData(e.target);
        const title = formData.get('postName')
        let content = contentRef.current.getContent()
        // remove <p> tags:
        // content = content.replace(/^<p>(.*)<\/p>$/, '$1');

        // actually, the content has to be kept with its html tags... 
        // how do we store this in DB and retrieve it succesfully
        console.log(content)
        console.log(title)
    }
    // on submit, need to post the new data to the API
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