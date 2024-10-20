import { useLoaderData } from "react-router-dom"
import { formatDate } from "../../utils/formatDate";

import viewStyles from "./blogView.module.css"
import { Comments } from "../../Components/Comments/Comments";

export const BlogView = () => {
    const post = useLoaderData();
    console.log('here is the loaded post', post)
    const formattedDate = formatDate(post.createdAt)
    

    return (
        <section className={viewStyles.blogViewSection}>
            <div className={viewStyles.blogContainer} id="blogContainer">
                <div className={viewStyles.titleSection}>
                    <h1>{post.title}</h1>
                    <h3>{formattedDate}</h3>
                </div>
                <div className={viewStyles.contentSection}>
                    <div 
                        dangerouslySetInnerHTML={{__html: post.content}}
                    />
                </div>
            </div>
            <div className={viewStyles.commentSection}>
                <h2>Comments</h2>
                <Comments 
                    post= {post}
                />
            </div>
        </section>
    )
}