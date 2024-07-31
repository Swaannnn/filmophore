import SearchBar from "@/components/SearchBar"
import {ReactElement} from "react"

export default function Header(): ReactElement {
    return (
        <header className="flex justify-evenly items-center h-16">
            <div className="">
                <a href="/" className="text-xl hover:text-white-secondary">FilmoPhore</a>
            </div>
            <div className="space-x-6">
                <a href="/popularMovies" className="hover:text-white-secondary">Popular Movies</a>
                <a href="/upcomingMovies" className="hover:text-white-secondary">Upcoming Movies</a>
                <a href="/" className="hover:text-white-secondary">Page 3</a>
            </div>
            <div>
                <SearchBar />
            </div>
            <div>
                <a>About me</a>
            </div>
        </header>
    )
}
