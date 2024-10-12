import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import dashStyles from "../../Pages/BlogDash/blogDash.module.css"

export const PostList = ({postList}) => {
    console.log(postList)

function handlePublish(e) {
    const postId = e.target.value
    console.log(postId)
    // do an API request here for publication
    // ... need to pass the id and the publication value
}

    return (
        <>
            {postList.map((post) => {

                return (
                    <div key={post.id} className={dashStyles.postContainer}>
                        <div className={dashStyles.postInfo}>
                            <h2>{post.title}</h2>
                            <h4>{post.createdAt}</h4>
                        </div>
                        <div className={dashStyles.postActions}>
                            <Link to={`/viewBlog/${post.id}`}>
                                View
                            </Link>
                            <Link to={`/editBlog/${post.id}`}>
                                Edit
                            </Link>
                            {post.published === false && (
                                <button 
                                    onClick={handlePublish}
                                    value={post.id}
                                >
                                    Publish
                                </button> 
                            )}
                            {post.published === true && (
                                <button 
                                    onClick={handlePublish}
                                    value={post.id}
                                >
                                    Un-Publish
                                </button> 
                            )}
                            
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