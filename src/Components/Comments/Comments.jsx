import { useRef, useState } from "react";
import { useAuth } from "../../utils/useAuth";
import { getEnvVariable } from "../../utils/apiSetter"
import PropTypes, { object } from "prop-types"

import viewStyles from "../../Pages/Blog/blogView.module.css"
import { Feedback } from "./CmtFeedback";

export const Comments = ({ post, handlePostChange, 
    commentList, handleLikeChange }) => {
    // need to pull in user to connect to new comments
    const { userData } = useAuth();

    const [boxVisible, setVisible] = useState(false)
    const textAreaRef = useRef()

    async function handleAddComment() {
        const userId = userData.id
        const commentContent = textAreaRef.current.value 

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

                // update post state, comment list:
                handlePostChange(updatedPost.id)
                textAreaRef.current = '';
                setVisible(false)
            }

        } catch(err) {
            console.log(err)
        }
    }

    function handleAddClick(e) {
        console.log('adding comment')
        if (boxVisible) {
            // e.target.textContent = 'Add a Comment'
            setVisible(false)
        } else if (!boxVisible) {
            // e.target.textContent = 'X Cancel'
            setVisible(true)
        }
    }

    function handleLike(likes, commentId) {
        const liked = true
        commentLikeFetch(liked, commentId, likes)
    }

    function handleDislike(likes, commentId) {
        const liked = false
        commentLikeFetch(liked, commentId, likes)
    }

    async function commentLikeFetch(liked, commentId, likes) {
        console.log('paramteres', liked, commentId, likes)
        const token = localStorage.getItem('token')
        const options = {
            method: "PUT",
            headers: {"Content-Type": "application/json", "Authorization": token},
            body: JSON.stringify({
                likes
            })
        }

        try {
            const apiUrl = getEnvVariable()
            let response;
            if (liked) {
                response = await fetch(`${apiUrl}/comment/like/${commentId}`, options)
            } else if (!liked) {
                response = await fetch(`${apiUrl}/comment/unlike/${commentId}`, options)
            }
            const data = await response.json()
            console.log(data)

            if (!response.ok) {
                console.log('not ok')
                return null
            } else {
                handleLikeChange(post.id);
            }

        } catch(err) {
            console.log(err)
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
                                <Feedback 
                                    comment = {comment}
                                    handleLike = {handleLike}
                                    handleDislike = {handleDislike}
                                />
                            </div>
                            
                            
                        </div>
                    )
                })}

            </div>
            <div className={viewStyles.btnHolder}>
                <button 
                    className={viewStyles.addCommentBtn}
                    onClick={(e) => {
                        handleAddClick(e);
                    }}
                >
                    {boxVisible ? 'X Cancel' : 'Add a Comment +'}
                </button>
            </div>
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
                    <div className={viewStyles.postBtnHolder}>
                        <button 
                            onClick={handleAddComment}
                            className={viewStyles.postNewBtn}
                        >
                            Post
                        </button>    
                    </div>
                    
                </div>
                
            )}
        </div>
    )
}

Comments.propTypes = {
    post: PropTypes.object,
    handlePostChange: PropTypes.func,
    commentList: PropTypes.array,
    handleLikeChange: PropTypes.func
}