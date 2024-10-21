import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom"
import { formatDate } from "../../utils/formatDate";
import { getSinglePostById } from "../../utils/loaders";

import viewStyles from "./blogView.module.css"
import { Comments } from "../../Components/Comments/Comments";

export const BlogView = () => {
    const initialPost = useLoaderData();
    console.log('here is the loaded post', initialPost)

    const [currentPost, setPost] = useState(initialPost)
    const [commentList, setList] = useState(initialPost.comments)
    const formattedDate = formatDate(initialPost.createdAt)
    
    
    async function handlePostChange(postId) {
        const newPost = await getSinglePostById(postId);
        const newComments = newPost.comments;
        console.log('changing post... here is new:', newPost)
        setPost(newPost)
        setList(newComments);
    }

    return (
        <section className={viewStyles.blogViewSection}>
            <div className={viewStyles.blogContainer} id="blogContainer">
                <div className={viewStyles.titleSection}>
                    <h1>{currentPost.title}</h1>
                    <h3>{formattedDate}</h3>
                </div>
                <div className={viewStyles.contentSection}>
                    <div 
                        dangerouslySetInnerHTML={{__html: currentPost.content}}
                    />
                </div>
            </div>
            <div className={viewStyles.commentSection}>
                <h2>Comments</h2>
                <Comments 
                    post= {currentPost}
                    handlePostChange= {handlePostChange}
                    commentList= {commentList}
                />
            </div>
        </section>
    )
}