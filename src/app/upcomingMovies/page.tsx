'use client'

import {ReactElement, useEffect, useState} from "react";
import MovieCard from "@/components/MovieCard/MovieCard";
import {Movie} from "@/models/model";

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
    }, []);

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <div>
            <h1>Films à venir</h1>
            <div>
                {movies.length > 0 ? (
                    movies.map((movie: Movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                ) : (
                    <p>Aucun film trouvé</p>
                )}
            </div>
        </div>
    );
}
