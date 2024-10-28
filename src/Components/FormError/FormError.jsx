import PropTypes from "prop-types"
import profileStyles from "../../Pages/Profile/profile.module.css"


export const FormError = ({ infoErrors }) => {
    return (
        <div className={profileStyles.formErrContainer}>
            {infoErrors.map(err => {
                return (
                    <div 
                        className={profileStyles.formErr}
                        key={`${err.type}-${err.msg}`}
                    >
                        {err.msg}
                    </div>
                )
            })}
        </div>
    )
}

FormError.propTypes = {
    infoErrors: PropTypes.array,
}
