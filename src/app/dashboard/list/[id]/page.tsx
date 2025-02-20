"use client"

import {useEffect, useState} from "react";
import {MovieList} from "@/types/types";
import {useAuth} from "@/context/AuthContext";
import {MovieCardInterface} from "@/models/model";
import MovieCard from "@/components/MovieCard";
import Loader from "@/components/Loader/Loader";

export default function List({ params } : { params: {id: string} }) {
    const id: string = params.id;
    const {user, status } = useAuth();

    const [movieList, setMovieList] = useState<MovieList>();
    const [movies, setMovies] = useState<MovieCardInterface[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMovieList() {
            const response = await fetch(`/api/movie-list?id=${id}`);
            if (response.ok) {
                setMovieList(await response.json());
            } else {
                console.error(`Erreur lors de la récupération de la MovieList ${id}`);
            }
        }

        fetchMovieList();
    }, [id]);

    useEffect(() => {
        async function fetchData() {
            if (movieList) {
                let allmovies = []
                for (const movieId of movieList.moviesId) {
                    const res: Response = await fetch(`/api/movie/${movieId}`)
                    const result = await res.json()
                    allmovies.push(result)
                }
                setMovies(allmovies)
                setLoading(false)
            }
        }

        fetchData()
    }, [movieList]);

    if (loading) return <Loader />

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-8">
                {user && (
                    <div>
                        {movieList && (
                            <div>
                                <div className="flex flex-col justify-center text-center">
                                    <p className="text-3xl">{movieList.name}</p>
                                    <p className="text-2xl">{movieList.description}</p>
                                </div>
                                <div>
                                    {movies.length > 0 ? (
                                        movies.map((movie: MovieCardInterface) => (
                                            <MovieCard key={movie.id} movie={movie} hideAddMovie={true}/>
                                        ))
                                    ) : (
                                        <p className="text-gray-300 text-center mt-4">Aucun film dans cette liste</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
