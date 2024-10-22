import { useRef, useState } from "react";
import PropTypes, { object } from "prop-types"

import viewStyles from "../../Pages/Blog/blogView.module.css"

export const Feedback = ({comment, handleLike, handleDislike}) => {
    // const [likeClicked, setLike] = useState(false)
    // const [dislikeClicked, setDislike] = useState(false)

    // lets try using Refs before utilizing the above states:
    const likeRef = useRef(false);
    const unlikeRef = useRef(false);

    const ACTIONS = {
        LIKE: 'LIKE',
        DISLIKE: 'DISLIKE'
    }

    function handleButtonClick(likes, commentId, action, btn) {
        switch(action) {
            case ACTIONS.LIKE:
                if (!likeRef.current) {
                    console.log('clicking it')
                    likeRef.current = true;
                    handleLike(likes, commentId)
                    btn.classList.add(viewStyles.clickedBtn)
                } else {
                    console.log('unclicking it')
                    likeRef.current = false
                    handleDislike(likes, commentId)
                    btn.classList.remove(viewStyles.clickedBtn)
                }
                break;
            case ACTIONS.DISLIKE:
                if (!unlikeRef.current) {
                    console.log('clicking it')
                    unlikeRef.current = true;
                    handleDislike(likes, commentId)
                    btn.classList.add(viewStyles.clickedBtn)
                } else {
                    console.log('unclicking it')
                    unlikeRef.current = false
                    handleLike(likes, commentId)
                    btn.classList.remove(viewStyles.clickedBtn)
                }
                break;
            default:
                console.error('Unknown like or dislike');
        }
    }

    return (
        <div className={viewStyles.feedbackBox}>
            <button 
                className={viewStyles.likeBtn}
                
                onClick={(e) => {
                    const btn = e.currentTarget;
                    btn.disabled = true;
                    handleButtonClick(comment.likes, comment.id, ACTIONS.LIKE, btn)
                    setTimeout(() => {
                        btn.disabled = false
                    }, 1000)
                }}
            >
                <i className="fa-regular fa-thumbs-up"></i>
            </button>
            <p className={viewStyles.likeCounter}>
                {comment.likes}
            </p>
            <button 
                className={viewStyles.dislikeBtn}
                onClick={(e) => {
                    const btn = e.currentTarget;
                    btn.disabled = true;
                    handleButtonClick(comment.likes, comment.id, ACTIONS.DISLIKE, btn)
                    setTimeout(() => {
                        btn.disabled = false
                    }, 1000)
                }}
            >
                <i className="fa-regular fa-thumbs-down"></i>
            </button>

        </div>
    )
}

Feedback.propTypes = {
    comment: PropTypes.object,
    handleLike: PropTypes.func,
    handleDislike: PropTypes.func
}