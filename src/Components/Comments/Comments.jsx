import { useLoaderData, useNavigate } from "react-router-dom"
import { useRef, useState } from "react";
import { useAuth } from "../../utils/useAuth";
import { getEnvVariable } from "../../utils/apiSetter"
import PropTypes, { object } from "prop-types"

import viewStyles from "../../Pages/Blog/blogView.module.css"

export const Comments = ({ post }) => {
    console.log('post comments are under', post)
    // need to pull in user... for posting comments
    const { userData } = useAuth();

    // left off here... need to also figure out how to submit textArea data
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

            if (!response.ok) {
                console.log('not ok')
                return null
            } else {
                console.log('yes')
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

            </div>
            <button 
                className={viewStyles.addCommentBtn}
                onClick={(e) => {
                    handleAddClick(e);
                }}
            >
                Add a Comment
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
    post: PropTypes.object
}