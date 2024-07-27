'use client'

// a voir pour le nom de la fonction
import {ReactElement, useEffect, useState} from "react";
import {Movie} from "@/models/model";
import MovieCard from "@/components/MovieCard/MovieCard";

export default function ResultMovie({ params } : { params: {query: string} }): ReactElement {
    const query = params.query

    const [data, setData] = useState<any>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/movie/search/${query}`)
            const result = await res.json()
            setData(result)
            setLoading(false)
        }

        fetchData()
            .then((): void => {
                console.log('fetch completed')
            })
            .catch(err => {
                setError(err.message)
            })
    }, [query])

    let movies = []
    if (data && data.results) {
        movies = data.results.map((movie: any) => ({
            id: movie.id,
            title: movie.title,
            // overview: movie.overview,
            release_date: movie.release_date,
            backdrop_path: movie.backdrop_path,
            poster_path: movie.poster_path,
            adult: movie.adult,
        }))
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <div>
            <h1>Résultats pour &quot;{query}&quot;</h1>
            <p>{movies.length} résltats</p>
            {movies.length > 0 ? (
                movies.map((movie: Movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))
            ) : (
                <p>Aucun résultat trouvé</p>
            )}
        </div>
    )
}
