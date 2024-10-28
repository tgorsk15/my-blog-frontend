import { useRef, useState } from "react";
import PropTypes from "prop-types"

import viewStyles from "../../Pages/Blog/blogView.module.css"

export const Feedback = ({comment, handleLike, handleDislike}) => {
    const [buttonLoading, setLoading] = useState(false)
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
                    likeRef.current = true;
                    handleLike(likes, commentId)
                    btn.classList.add(viewStyles.clickedBtn)
                } else {
                    likeRef.current = false
                    handleDislike(likes, commentId)
                    btn.classList.remove(viewStyles.clickedBtn)
                }
                break;
            case ACTIONS.DISLIKE:
                if (!unlikeRef.current) {
                    unlikeRef.current = true;
                    handleDislike(likes, commentId)
                    btn.classList.add(viewStyles.clickedBtn)
                } else {
                    unlikeRef.current = false
                    handleLike(likes, commentId)
                    btn.classList.remove(viewStyles.clickedBtn)
                }
                break;
            default:
                console.error('Unknown like or dislike');
        }
    }

    function handleButtonLoad() {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 600)
    }

    return (
        <div className={viewStyles.feedbackBox}>
            {buttonLoading && (
                <div className={viewStyles.spinnerContainer}>
                    <div className={viewStyles.loadSpinner}>

                    </div>    
                </div>
            )}
            <button 
                className={viewStyles.likeBtn}
                
                onClick={(e) => {
                    const btn = e.currentTarget;
                    btn.disabled = true;
                    handleButtonClick(comment.likes, comment.id, ACTIONS.LIKE, btn)
                    handleButtonLoad();
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
                    handleButtonLoad();
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