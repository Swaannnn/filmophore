import {Movie} from "@/models/model";
import {ReactElement} from "react";

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCardDetails({movie} : MovieCardProps): ReactElement{
    return (
        <div key={movie.id}>
            <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
            />
            <h1>{movie.title}, sorti le {movie.release_date}</h1>
            <p>{movie.overview}</p>
            {movie.id}

            <br/><br/><br/>oui c&apos;est un film en détail tqt
        </div>
    )
}