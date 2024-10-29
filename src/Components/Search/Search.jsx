import PropTypes from "prop-types"
import homeStyles from "../../Pages/Home/home.module.css"

export const Search = ({ postsList, setLoading, setList, handleGetAll }) => {

        function filterByQuery(query) {
            return [...postsList].filter(post => 
                post.title.toLowerCase().includes(query.toLowerCase())
            )
        }

        function handleSearch(e) {
            e.preventDefault()
            // possibly set loading state here

            const formData = new FormData(e.target);
            const searchQuery = formData.get('searchQuery')
            console.log(searchQuery)
            const results = filterByQuery(searchQuery)
            console.log('new filtered list:', results)
        }

        function handleReset() {
            // could call handleGetAll here
            handleGetAll()
        }

        return (
            <div className={homeStyles.searchContainer}>
                <h2>Search...</h2>
                <form onSubmit={handleSearch}>
                    <input 
                        type="text"
                        name="searchQuery"
                        id={homeStyles.searchQuery}
                    />
                    <button 
                        type="submit"
                        className={homeStyles.searchbtn}
                    >
                        <i className="fa-solid fa-angle-right"></i>
                    </button>
                </form>
                <button
                    className={homeStyles.resetBtn}
                    onClick={handleReset}
                >
                    Clear
                </button>
            </div>
        )
}

Search.propTypes = {
    postsList: PropTypes.array,
    setLoading: PropTypes.func,
    setList: PropTypes.func,
    handleGetAll: PropTypes.func
}