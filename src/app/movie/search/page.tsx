'use client'

import { useEffect, useState } from "react"
import { MovieInterface } from "@/models/model"
import MovieCard from "@/components/MovieCard"
import Loader from "@/components/Loader/Loader"
import { searchMovies } from "@/services/movieService"

export default function ResultMovie() {
    const [query, setQuery] = useState<string>("")
    const [movies, setMovies] = useState<MovieInterface[]>([])
    const [totalResult, setTotalResult] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const queryParam = urlParams.get("query") || ""
        if (queryParam) {
            setQuery(queryParam)
        }
    }, [])

    useEffect(() => {
        if (!query.trim()) {
            setMovies([])
            setTotalResult(0)
            setLoading(false)
            return
        }

        async function fetchMovies() {
            setLoading(true);
            setError(null);
            const result = await searchMovies(query);

            if (result) {
                setMovies(result.results || [])
                setTotalResult(result.total_results || 0)
            } else {
                setError("Aucun film trouvé.")
            }

            setLoading(false)
        }

        fetchMovies()
    }, [query])

    if (loading) return <Loader />
    if (error) return <p className="text-red-500">{error}</p>

    return (
        <div className="flex flex-col justify-center items-center max-w-full">
            <h1 className="text-[3em]">{totalResult} résultats trouvés pour &quot;{query}&quot;</h1>
            <div>
                {movies.length > 0 ? (
                    movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
                ) : (
                    <p className="text-gray-500">Aucun résultat trouvé</p>
                )}
            </div>
        </div>
    )
}
