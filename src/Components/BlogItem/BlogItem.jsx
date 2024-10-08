import PropTypes from "prop-types"

import homesStyles from "../../Pages/Home/home.module.css"

export const BlogItem = ({ post }) => {
    console.log('here is post item:', post)


    return (
        <div className={homesStyles.blogItem}>
            this is blog item
        </div>
    )
}

BlogItem.propTypes = {
    post: PropTypes.object
}