import PropTypes from "prop-types"

import dashStyles from "../../Pages/BlogDash/blogDash.module.css"

export const PostList = ({postList}) => {
    console.log(postList)
    return (
        <>
            {postList.map((post) => {

                return (
                    <div key={post.id} className={dashStyles.postContainer}>
                        <div className={dashStyles.postInfo}>
                            <h2>{post.title}</h2>
                            <h4>{post.createdAt}</h4>
                        </div>
                        

                    </div>
                )
                
            })}
        </>
    )
}

PostList.propTypes = {
    postList: PropTypes.array
}