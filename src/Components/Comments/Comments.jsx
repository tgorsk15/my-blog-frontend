import { useLoaderData, useNavigate } from "react-router-dom"
import { useRef, useState } from "react";
import { useAuth } from "../../utils/useAuth";
import { getEnvVariable } from "../../utils/apiSetter"
import PropTypes, { object } from "prop-types"

import viewStyles from "../../Pages/Blog/blogView.module.css"

export const Comments = ({ post, handlePostChange, commentList }) => {
    console.log('post comments are under', post)
    // need to pull in user to connect to new comments
    const { userData } = useAuth();

    const [boxVisible, setVisible] = useState(false)
    const textAreaRef = useRef()

    async function handleAddComment() {
        const userId = userData.id
        const commentContent = textAreaRef.current.value 
        console.log(commentContent)

        const token = localStorage.getItem('token');
        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json", "Authorization": token},
            body: JSON.stringify({
                commentContent,
                userId
            })
        }

        try {
            const apiUrl = getEnvVariable()
            const response = await fetch(`${apiUrl}/comment/create/${post.id}`, options)
            const data = await response.json()
            console.log('data after comment insertion', data)
            const updatedPost = data.post

            if (!response.ok) {
                console.log('not ok')
                return null
            } else {
                console.log('success, setting state');
                // update post state, comment list:
                handlePostChange(updatedPost.id)
            }

        } catch(err) {
            console.log(err)
        }
    }

    function handleAddClick(e) {
        console.log('adding comment')
        if (boxVisible) {
            e.target.textContent = 'Add a Comment'
            setVisible(false)
        } else if (!boxVisible) {
            e.target.textContent = 'X Cancel'
            setVisible(true)
        }
    }

    return (
        <div className={viewStyles.commentsContainer}>
            <div className={viewStyles.commentsList}>
                {/* put conditional here for when there is no comments */}
                {/* map through comments list */}
                {commentList.map((comment) => {
                    return (
                        <div className={viewStyles.commentContainer} key={comment.id}>
                            <div className={viewStyles.topSection}>
                                <h4>{comment.username}</h4>
                                <h5>{comment.createdAt}</h5>
                            </div>
                            <div className={viewStyles.bottomSection}>
                                <p className={viewStyles.commentTxt}> 
                                    {comment.content}
                                </p>
                                <div className={viewStyles.feedbackBox}>
                                    <button className={viewStyles.likeBtn}>
                                        L
                                    </button>
                                    <p className={viewStyles.likeCounter}>
                                        {comment.likes}
                                    </p>
                                    <button className={viewStyles.dislikeBtn}>
                                        D
                                    </button>

                                </div>
                            </div>
                            
                            
                        </div>
                    )
                })}

            </div>
            <button 
                className={viewStyles.addCommentBtn}
                onClick={(e) => {
                    handleAddClick(e);
                }}
            >
                Add a Comment  <strong>+</strong>
            </button>
            {boxVisible && (
                <div className={viewStyles.createCommentContainer}>
                    <textarea 
                        name="newComment" 
                        id="newComment"
                        ref={textAreaRef}
                        placeholder="Write Something..."
                        rows={8}
                        cols={95}
                        maxLength={420}
                    >
                    </textarea>
                    <button onClick={handleAddComment}>
                        Post
                    </button>
                </div>
                
            )}
        </div>
    )
}

Comments.propTypes = {
    post: PropTypes.object,
    handlePostChange: PropTypes.func,
    commentList: PropTypes.array
}