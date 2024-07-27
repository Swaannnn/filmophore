import SearchBar from "@/components/SearchBar/SearchBar";
import {ReactElement} from "react";

export default function Header(): ReactElement {
    return (
        <header className="flex justify-evenly">
            <div className="">
                <a href="/" className="hover:underline">FilmoPhore</a>
            </div>
            <div className="space-x-6">
                <a href="/popularMovies" className="hover:underline">Popular Movies</a>
                <a href="/upcomingMovies" className="hover:underline">Upcoming Movies</a>
                <a>Page 3</a>
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
