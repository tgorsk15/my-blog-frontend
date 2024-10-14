import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { getEnvVariable } from "../../utils/apiSetter"

import dashStyles from "../../Pages/BlogDash/blogDash.module.css"

export const PostList = ({ activeList, setList, handleListChange }) => {

    // function handleListChange(updatedPost) {
    //     console.log('updated post', updatedPost)
    //     const newBoolean = updatedPost.published

    //     const newList = [...postList];
    //     newList.forEach((post) => {
    //         if (post.id === updatedPost.id) {
    //             post.published = newBoolean
    //         }
    //     })
    //     setList(newList)
    // }


    async function handlePublish(e) {
        const postId = e.target.value
        console.log(postId)
        const buttonText = e.target.innerText
        const savedButtonText = buttonText
        let pblcBoolean;

        if (buttonText === 'Publish') {
            pblcBoolean = true
        } else if (buttonText === 'Un-Publish') {
            pblcBoolean = false
        }


        const token = localStorage.getItem('token')
        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json", "Authorization": token},
        }

        try {
            const apiUrl = getEnvVariable()
            console.log('boolean before fetch', pblcBoolean)
            const response = await fetch(`${apiUrl}/post/publish/${postId}/${pblcBoolean.toString()}`, options)

            if (!response.ok) {
                console.log('not ok')
                return null
            } else {
                const data = await response.json()
                handleListChange(savedButtonText)
                return
            }

        } catch(err) {
            console.log(err)
        }

    }

    return (
        <>
            {activeList.map((post) => {

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
    activeList: PropTypes.array,
    handleListChange: PropTypes.func
}