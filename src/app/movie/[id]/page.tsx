'use client'

import { useEffect, useState } from "react"
import MovieCardDetails from "@/components/MovieCardDetails/MovieCardDetails"
import Loader from "@/components/Loader/Loader"
import { MovieInterface } from "@/models/model"
import { fetchMovieById } from "@/services/movieService"

export default function Movie({ params }: { params: { id: string } }) {
    const id: string = params.id

    const [movie, setMovie] = useState<MovieInterface | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function getMovie() {
            setLoading(true);
            const result = await fetchMovieById(id);
            if (result) {
                setMovie(result);
            } else {
                setError("Aucun film trouvé.");
            }
            setLoading(false);
        }

        getMovie();
    }, [id]);

    if (loading) return <Loader />;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex justify-center p-6">
            {movie ? (
                <MovieCardDetails key={movie.id} movie={movie} />
            ) : (
                <p className="text-gray-500">Aucun film trouvé avec cet ID.</p>
            )}
        </div>
    );
}
