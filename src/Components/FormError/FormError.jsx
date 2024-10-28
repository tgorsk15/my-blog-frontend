import PropTypes from "prop-types"
import profileStyles from "../../Pages/Profile/profile.module.css"


export const FormError = ({ infoErrors }) => {
    console.log(infoErrors);
    return (
        <div className={profileStyles.formErrContainer}>
            {infoErrors.map(err => {
                {console.log(err)}
                return (
                    <div 
                        className={profileStyles.formErr}
                        key={`${err.type}-${err.msg}`}
                    >
                        {err.msg} HI
                    </div>
                )
            })}
        </div>
    )
}

FormError.propTypes = {
    infoErrors: PropTypes.array,
}

// left off here... plug this into Claude and see why my error 
// messages are not being displayed in the browser