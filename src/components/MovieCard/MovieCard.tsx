import {Movie} from "@/models/model";

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({movie} : MovieCardProps) {
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
        </div>
    )
}