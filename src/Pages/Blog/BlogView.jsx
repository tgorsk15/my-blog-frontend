import { useState } from "react";
import { useLoaderData, redirect } from "react-router-dom"
import { formatDate } from "../../utils/formatDate";
import { getSinglePostById } from "../../utils/loaders";
import { isTokenExpired } from "../../utils/checkExpire";

import viewStyles from "./blogView.module.css"
import { Comments } from "../../Components/Comments/Comments";
import { useAuth } from "../../utils/useAuth";

export const BlogView = () => {
    const initialPost = useLoaderData();
    const { logout } = useAuth()

    const [currentPost, setPost] = useState(initialPost)
    const [commentList, setList] = useState(initialPost.comments)
    const formattedDate = formatDate(initialPost.createdAt)
    const token = localStorage.getItem('token')
    
    
    async function handlePostChange(postId) {
        const tokenExp = await isTokenExpired(token)
        if (tokenExp) {
            logout()
            return redirect('/profile/login')
        }
        const newPost = await getSinglePostById(postId, logout);
        const newComments = newPost.comments;
        setPost(newPost)
        setList(newComments);
    }

    async function handleLikeChange(postId) {
        const tokenExp = await isTokenExpired(token)
        if (tokenExp) {
            logout()
            return redirect('/profile/login')
        }
        const newPost = await getSinglePostById(postId, logout);
        const newComments = newPost.comments;
        setList(newComments)
    }

    return (
        <section className={viewStyles.blogViewSection}>
            <div className={viewStyles.blogContainer}>
                <div className={viewStyles.titleSection}>
                    <h1>{currentPost.title}</h1>
                    <h3>Written {formattedDate}</h3>
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
                    handleLikeChange= {handleLikeChange}
                />
            </div>
        </section>
    )
}