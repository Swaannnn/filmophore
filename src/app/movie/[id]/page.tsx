'use client'

import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard/MovieCard";
import MovieCardDetails from "@/components/MovieCardDetails/MovieCardDetails";
// import {Movie} from "@/models/model";

// function fetchMovie(id: string) {
//     const response = await fetch()
// }

// async ?
export default function Movie({ params } : { params: {id: string} }) {
    const id = params.id

    // remplacer any par Movie apres je pense
    const [movie, setMovie] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/movie/${id}`)
            const result = await res.json()
            setMovie(result)
            setLoading(false)
        }

        fetchData()
            .then((): void => {
                console.log('fetch completed')
            })
            .catch(err => {
                setError(err.message)
            })
    }, [id]);

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    if (movie.success == false) {
        return (
            <div>
                <p>Aucun film avec cet id</p>
            </div>
        //     a refaire mieux ici là
        )
    }

    return (
        <div>
            <MovieCardDetails key={movie.id} movie={movie}></MovieCardDetails>
        </div>
    )
}
