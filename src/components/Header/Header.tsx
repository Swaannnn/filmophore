export default function Header() {
    return (
        <header className="flex justify-evenly">
            <div className="">
                <a href="/" className="hover:underline">FilmoPhore</a>
            </div>
            <div className="space-x-6">
                <a href="/popularMovies" className="hover:underline">Popular Movies</a>
                <a>Page 2</a>
                <a>Page 3</a>
            </div>
            <div>
                <a>About me</a>
            </div>
        </header>
    )
}
