'use client'

import React, {ChangeEvent, FormEvent, ReactElement, useState, MouseEvent} from "react"
import Image from "next/image"

export default function SearchBar(): ReactElement {
    const [query, setQuery] = useState<string>('')

    function searchMovie(event: FormEvent<HTMLFormElement> | MouseEvent<HTMLImageElement>): void {
        event.preventDefault()
        document.location = `/movie/search?query=${query}`
    }

    return (
        <div className="searchBar flex items-center px-6 py-1 rounded-full border-solid border-black border-x border-y bg-white">
            <form onSubmit={searchMovie}>
                <input
                    className="outline-0 text-black"
                    type="text" placeholder="Search a movie"
                    value={query}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}

                />
            </form>
            <Image
                className="cursor-pointer"
                src="/assets/search_icon.png"
                width={20}
                height={20}
                alt="search icon"
                onClick={(searchMovie)}
            />
        </div>
    )
}
