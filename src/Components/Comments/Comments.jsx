import { useLoaderData, useNavigate } from "react-router-dom"
import { useRef, useState } from "react";

import viewStyles from "../../Pages/Blog/blogView.module.css"

export const Comments = ({ post }) => {
    console.log('post comments are under', post)

    const [boxVisible, setVisible] = useState(false)

    function handleAddComment() {
        
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
            Hi this si the Comments
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
                // left off here... build out textArea input (or entire form)
                // on submit, it will trigger handleAddComment...
                // this function will call the API and modify the database
                <div className={viewStyles.createCommentContainer}>
                    <textarea 
                        name="newComment" 
                        id="newComment"
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