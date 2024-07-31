export async function fetchMovies(endpoint: string) {
    const url: string = `https://api.themoviedb.org/3${endpoint}`
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN}`
        }
    }

    const response = await fetch(url, options)

    let data = await response.json()

    if (data && data.results) {
        return data.results.map((movie: any) => ({
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            release_date: movie.release_date,
            poster_path: movie.poster_path,
            backdrop_path: movie.backdrop_path,
            adult: movie.adult,
        }))
    }

    return []
}
