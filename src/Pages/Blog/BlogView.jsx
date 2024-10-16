import { useLoaderData } from "react-router-dom"

import { formatDate } from "../../utils/formatDate";
import viewStyles from "./blogView.module.css"

export const BlogView = () => {
    const post = useLoaderData();
    console.log('here is the loaded post', post)
    const formattedDate = formatDate(post.createdAt)

    // idea: have a separate Comments Component that I can plug in at
    // the end BlogView
    

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
        </section>
    )
}