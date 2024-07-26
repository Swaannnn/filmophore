'use client'

import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard/MovieCard";
import {Movie} from "@/models/model";

export default function PopularMovies() {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('/api/popularMovies')
            const result = await res.json()
            setData(result)
            setLoading(false)
        }

        fetchData()
    }, []);

    let movies = []
    if (data && data.results) {
        movies = data.results.map((movie: any) => ({
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            release_date: movie.release_date,
            backdrop_path: movie.backdrop_path,
            poster_path: movie.poster_path,
            adult: movie.adult,
        }))
    }

    if (loading) return <p>Loading...</p>

    return (
        <main>
            <h1>Films populaires</h1>
            <div>
                {movies.length > 0 ? (
                    movies.map((movie: Movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                ) : (
                    <p>Aucun film trouvé</p>
                )}
            </div>
        </main>
    );
}
