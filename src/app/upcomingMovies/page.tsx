'use client'

import { ReactElement, useEffect, useState } from "react"
import { MovieCardInterface } from "@/models/model"
import MovieCard from "@/components/MovieCard"
import Loader from "@/components/Loader/Loader"

export default function LatestMovies(): ReactElement {
    const [movies, setMovies] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect((): void => {
        async function fetchData(): Promise<void> {
            const res: Response = await fetch('/api/upcomingMovies')
            const result = await res.json()
            setMovies(result)
            setLoading(false)
        }

        fetchData()
            .then((): void => {
                console.log('fetch completed')
            })
            .catch(err => {
                setError(err.message)
            })
    }, [])

    if (loading) return <Loader />
    if (error) return <p>{error}</p>

    return (
        <div className="flex flex-col justify-center items-center max-w-full">
            <h1 className="text-[4em]">Films à venir</h1>
            <div>
                {movies.length > 0 ? (
                    movies.map((movie: MovieCardInterface) => (
                        <MovieCard key={movie.id} movie={movie}/>
                    ))
                ) : (
                    <p>Aucun film trouvé</p>
                )}
            </div>
        </div>
    )
}
