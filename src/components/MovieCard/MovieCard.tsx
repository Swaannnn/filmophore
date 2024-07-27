import {Movie} from "@/models/model";
import Link from "next/link";
import {ReactElement, useEffect, useState} from "react";
import Image from "next/image";

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({movie} : MovieCardProps): ReactElement{
    return (
        <div key={movie.id} className="flex" >
            <Link href={'/movie/[id]'} as={`/movie/${movie.id}`}>
                <Image
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    height={450}
                    width={300}
                    className="movie-poster"
                    alt={movie.title}
                />
            </Link>
            <Link href={'/movie/[id]'} as={`/movie/${movie.id}`}>
                <h1>{movie.title}, sortie le {movie.release_date}</h1>
            </Link>
        </div>
    )
}