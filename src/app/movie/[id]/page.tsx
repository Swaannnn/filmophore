'use client'

import { ReactElement, useEffect, useState } from "react"
import MovieCardDetails from "@/components/MovieCardDetails"
import Loader from "@/components/Loader/Loader"
import { MovieInterface } from "@/models/model"

export default function Movie({ params } : { params: {id: string} }): ReactElement {
    const id: string = params.id

    // remplacer any par Movie apres je pense
    const [movie, setMovie] = useState<MovieInterface | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchData() {
            const res: Response = await fetch(`/api/movie/${id}`)
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

    if (loading) return <Loader />
    if (error) return <p>{error}</p>

    if (movie == null) {
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
