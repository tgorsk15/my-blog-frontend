import { Link } from 'react-router-dom'
import PropTypes from "prop-types"

import homesStyles from "../../Pages/Home/home.module.css"

export const BlogItem = ({ post }) => {
    // console.log('here is post item:', post)


    return (
        <div className={homesStyles.blogItem}>
            <Link to={`/viewBlog/${post.id}`}>
            <h2>
                {post.title}
            </h2>
            <h4>
                Written {post.createdAt}
            </h4>
            </Link>
        </div>
    )
}

BlogItem.propTypes = {
    post: PropTypes.object
}