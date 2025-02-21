'use client'

import { useEffect, useState } from "react"
import MovieCard from "@/components/MovieCard"
import { MovieCardInterface } from "@/models/model"
import Loader from "@/components/Loader/Loader"
import { fetchPopularMovies } from "@/services/movieService"

export default function PopularMovies() {
    const [movies, setMovies] = useState<MovieCardInterface[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const getMovies = async () => {
            try {
                setLoading(true)
                setError(null)

                const result = await fetchPopularMovies()

                if (result) {
                    setMovies(result)
                } else {
                    setError("Aucun film trouvé.")
                }
            } catch (err) {
                setError("Erreur lors du chargement des films populaires.")
            } finally {
                setLoading(false)
            }
        }

        getMovies()
    }, [])

    return (
        <div className="flex flex-col justify-center items-center max-w-full">
            <h1 className="text-[4em]">Films populaires</h1>

            {loading && <Loader />}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && (
                <div>
                    {movies.length > 0 ? (
                        movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
                    ) : (
                        <p className="text-gray-500">Aucun film trouvé</p>
                    )}
                </div>
            )}
        </div>
    )
}
