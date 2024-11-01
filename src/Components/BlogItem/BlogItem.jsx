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
                Written {post.createdAt}
            </h4>
            <p>{post.preview}</p>
            </Link>
        </div>
    )
}

BlogItem.propTypes = {
    post: PropTypes.object
}