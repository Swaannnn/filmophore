import { ReactElement } from "react"
import { MovieCardInterface } from "@/models/model"
import {formatDate} from "@/utils/formatter"
import Link from "next/link"
import Image from "next/image"

interface MovieCardProps {
    movie: MovieCardInterface;
}

export default function MovieCard({movie} : MovieCardProps): ReactElement{
    return (
        <div className="text-black">
            <div className="flex bg-white-primary w-[600px] rounded-lg p-4 my-4">

                <Link href={'/movie/[id]'} as={`/movie/${movie.id}`}>
                    <Image
                        className="rounded-md hover:opacity-50"
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        height={360}
                        width={240}
                        alt={movie.title}
                    />
                </Link>

                <div key={movie.id} className="w-[400px] p-2">
                    <Link href={'/movie/[id]'} as={`/movie/${movie.id}`}>
                        <h3 className="text-xl font-bold line-clamp-[2] hover:text-black-secondary">{movie.title}</h3>
                    </Link>
                    <p className="text-sm text-black-secondary">{formatDate(movie.release_date)}</p>
                    <br />
                    <p className="line-clamp-[8]">{movie.overview}</p>
                </div>
            </div>
        </div>
    )
}
