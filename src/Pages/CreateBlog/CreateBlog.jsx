import { useRef } from "react";
import { PostEditor } from "../../Components/Editor/Editor"

import blogStyles from "../EditBlog/blogEditor.module.css"

export const CreateBlog = () => {
    const contentRef = useRef(null);

    function handleSubmit(e) {
        e.preventDefault()
        console.log('submitted form')
        // const editor = TinyMCEEditor.get("blogEditor")
        // console.log(editor)
        let content = contentRef.current.getContent()
        content = content.replace(/^<p>(.*)<\/p>$/, '$1');
        console.log(content)
        // this is working, figure out hwo to remove <p> tags
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