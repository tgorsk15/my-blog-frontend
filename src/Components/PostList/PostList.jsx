import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"
import { getEnvVariable } from "../../utils/apiSetter"

import dashStyles from "../../Pages/BlogDash/blogDash.module.css"

export const PostList = ({ activeList, handleListChange, setDashLoading }) => {
    const navigate = useNavigate();

    async function handlePublish(e) {
        console.log('getting published?')
        const postId = e.target.value
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
                handleListChange(savedButtonText)
                return
            }

        } catch(err) {
            console.log(err)
        }
    }

    function handleNavigate(path) {
        setDashLoading(true)
        navigate(path)
        setTimeout(() => {
            setDashLoading(false)
        }, 600)
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
                            <button
                                onClick={() => handleNavigate(`/viewBlog/${post.id}`)}
                            >
                                View
                            </button>
                            <button
                                onClick={() => handleNavigate(`/editBlog/${post.id}`)}
                            >
                                Edit
                            </button>
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
    handleListChange: PropTypes.func,
    setDashLoading: PropTypes.func
}