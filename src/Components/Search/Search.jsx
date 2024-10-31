import PropTypes from "prop-types"
import homeStyles from "../../Pages/Home/home.module.css"

export const Search = ({ postsList, setList, handleGetAll }) => {

        function filterByQuery(query) {
            return [...postsList].filter(post => 
                post.title.toLowerCase().includes(query.toLowerCase())
            )
        }

        function handleSearch(e) {
            e.preventDefault()

            const formData = new FormData(e.target);
            const searchQuery = formData.get('searchBar')
            const results = filterByQuery(searchQuery)
            console.log('new filtered list:', results)
            
            setList(results)
        }

        function handleReset() {
            handleGetAll()
        }

        return (
            <div className={homeStyles.searchContainer}>
                <h2 className={homeStyles.searchTitle}>
                    Search...
                </h2>
                <form 
                    onSubmit={handleSearch}
                    className={homeStyles.searchForm}
                >
                    <input 
                        type="text"
                        name="searchBar"
                        id={homeStyles.searchBar}
                    />
                    <button 
                        type="submit"
                        className={homeStyles.searchBtn}
                    >
                        <i className="fa-solid fa-angle-right"></i>
                    </button>
                </form>
                {/* left off here, figure out why positioning is not working */}
                <button
                    className={homeStyles.resetBtn}
                    onClick={handleReset}
                >
                    Reset
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