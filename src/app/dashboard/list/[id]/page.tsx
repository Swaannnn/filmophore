"use client"

import {useEffect, useState} from "react";
import {MovieList} from "@/types/types";
import MovieListCard from "@/components/MovieCardDetails/MovieListCard";
import {useAuth} from "@/context/AuthContext";

export default function List({ params } : { params: {id: string} }) {
    const id: string = params.id;
    const {user, status } = useAuth();

    const [movieList, setMovieList] = useState<MovieList>();

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
    });

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-8">
                {user && (
                    <div>
                        {movieList && (
                            <MovieListCard id={movieList.id} name={movieList.name} description={movieList.description} />
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
