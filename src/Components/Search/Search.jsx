
import homeStyles from "../../Pages/Home/home.module.css"

export const Search = () => {

        function handleSearch(e) {
            e.preventDefault()
            // possibly set loading state here

            const formData = new FormData(e.target);
            const searchQuery = formData.get('searchQuery')
            console.log(searchQuery)
        }

        function handleReset() {

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
                    Reset
                </button>
            </div>
        )
}