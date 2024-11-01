import { Link } from 'react-router-dom'
import PropTypes from "prop-types"

import homesStyles from "../../Pages/Home/home.module.css"

export const BlogItem = ({ post }) => {

    return (
        <div className={homesStyles.blogCard}>
            <Link to={`/viewBlog/${post.id}`}>
            <h2 className={homesStyles.cardTitle}>
                {post.title}
            </h2>
            <h4 className={homesStyles.cardContent}>
                {post.createdAt}
            </h4>
            <p className={homesStyles.postPreview}>
                {post.preview}
            </p>
            
            <h3 className={homesStyles.readLink}>
                Read 
                <i className="fa-solid fa-angle-right"></i>
            </h3>
            </Link>
        </div>
    )
}
// TMW 11/1: Continue to style the article cards... 
// eventually move onto styling the right side of page

BlogItem.propTypes = {
    post: PropTypes.object
}