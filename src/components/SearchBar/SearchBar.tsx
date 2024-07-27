'use client'

import React, {ChangeEvent, FormEvent, ReactElement, useState, MouseEvent} from "react";

export default function SearchBar(): ReactElement {
    const [query, setQuery] = useState<string>('')

    function searchMovie(event: FormEvent<HTMLFormElement> | MouseEvent<HTMLImageElement>): void {
        event.preventDefault()
        document.location = `/movie/search/${query}`
    }

    return (
        <div className="searchBar flex items-center px-6 py-1 rounded-full border-solid border-black border-x border-y">
            <form onSubmit={searchMovie}>
                <input
                    className="outline-0"
                    type="text" placeholder="Search a movie"
                    value={query}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}

                />
            </form>
            <img
                className="h-5 cursor-pointer"
                src="/assets/search_icon.png"
                alt="search icon"
                onClick={(searchMovie)}
            />
        </div>
    )
}
