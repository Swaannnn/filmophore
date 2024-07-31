'use client'

import { ReactElement, useEffect, useState } from "react"
import { MovieInterface } from "@/models/model"
import MovieCard from "@/components/MovieCard"
import Loader from "@/components/Loader/Loader"

export default function ResultMovie(): ReactElement {
    const [query, setQuery] = useState<string | null>(null)
    const [data, setData] = useState<any>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect((): void => {
        const urlParams: URLSearchParams = new URLSearchParams(window.location.search)
        const queryParam: string | null = urlParams.get('query')

        if (queryParam) {
            setQuery(queryParam)
        }
    }, [])

    useEffect((): void => {
        if (!query) return
        async function fetchData(): Promise<void> {
            const res: Response = await fetch(`/api/movie/search?query=${query}`)
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

    let movies: MovieInterface[] = []
    let totalResult = 0
    if (data && data.results) {
        movies = data.results.map((movie: MovieInterface) => ({
            id: movie.id,
            title: movie.title,
            release_date: movie.release_date,
            backdrop_path: movie.backdrop_path,
            poster_path: movie.poster_path,
        }))
        totalResult = data.total_results
    }

    if (loading) return <Loader />
    if (error) return <p>{error}</p>

    return (
        <div className="flex flex-col justify-center items-center max-w-full">
            <h1 className="text-[3em]">{totalResult} résultats trouvé pour &quot;{query}&quot;</h1>
            <div>
                {movies.length > 0 ? (
                    movies.map((movie: MovieInterface) => (
                        <MovieCard key={movie.id} movie={movie}/>
                    ))
                ) : (
                    <p>Aucun résultat trouvé</p>
                )}
            </div>
        </div>
    )
}
