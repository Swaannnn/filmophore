'use client'

import './SearchBar.css'

export default function SearchBar() {
    function searchMovie() {
        event.preventDefault()
        console.log("FILM !!!")
    }

    return (
        <div className="searchBar">
            <form onSubmit={searchMovie}>
                <input
                    className="searchBarText"
                    type="text" placeholder="Search a movie"
                />
            </form>
            <img
                id="searchBarImage"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTt2Mj8dwtrYLcbqDn-nDazo9p_uU7lQ8phQ&s"
                alt="searchbar image"
                onClick={searchMovie}
            />
        </div>
    )
}