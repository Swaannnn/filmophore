'use client'

import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard/MovieCard";
// import {Movie} from "@/models/model";

// function fetchMovie(id: string) {
//     const response = await fetch()
// }

// async ?
export default function Movie({ params } : { params: {id: string} }) {
    const id = params.id

    const [movie, setMovie] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/movie/${id}`)
            const result = await res.json()
            setMovie(result)
            setLoading(false)
        }

        fetchData()
            .then(() => {
                console.log('fetch completed')
            })
            .catch(err => {
                setError(err.message)
            })
    }, [id]);

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <div>
            <MovieCard key={movie.id} movie={movie}></MovieCard>
            {/* Faire MovieDetails (par exemple) pour la page détaillée */}
        </div>
    )
}