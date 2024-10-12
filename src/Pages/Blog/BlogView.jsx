import { useLoaderData } from "react-router-dom"

import { formatDate } from "../../utils/formatDate";
import viewStyles from "./blogView.module.css"

export const BlogView = () => {
    const post = useLoaderData();
    console.log('here is the loaded post', post)
    const formattedDate = formatDate(post.createdAt)

    // left off here... nothing is showing on screen
    console.log(post.title)
    console.log(post.createdAt)
    

    return (
        <section className={viewStyles.blogViewSection}>
            <div className={viewStyles.blogContianer}>
                <div className={viewStyles.titleSection}>
                    <h1>{post.title}</h1>
                    <h3>{formattedDate}</h3>
                </div>
                <div className={viewStyles.contentSection}>
                    <h4>
                        {post.content}
                    </h4>
                </div>
            </div>
        </section>
    )
}