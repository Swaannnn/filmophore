import React from "react";
import Image from "next/image";
import {formatCountry, formatDate, formatRuntime} from "@/utils/formatter";
import {MovieInterface} from "@/models/model";

interface DetailsMovieProps {
    movie: MovieInterface
}

export default function DetailsMovie({movie}: DetailsMovieProps): React.ReactElement {
    return (
        <div className="pt-10">
            <p className="text-4xl font-bold underline underline-offset-4 decoration-white">Synopsis</p>
            <p className="pt-4 italic text-white-secondary">{movie.tagline}</p>
            <p className="">{movie.overview}</p>

            <div className="pt-10 flex">
                <Image
                    className=" rounded-md"
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    height={360}
                    width={240}
                    alt={movie.title}
                />
                <div className="flex flex-col gap-2 pl-4 pt-10">
                    {movie.status == 'Released' ? (
                        <p>Sortie le {formatDate(movie.release_date)}</p>
                    ) : (
                        <p>Sortie prévue le {formatDate(movie.release_date)}</p>
                    )}
                    <p>{formatRuntime(movie.runtime)}</p>

                    <p>{movie.genres.map((genre: any) => genre.name).join(', ')}</p>
                    {movie.origin_country.length > 0 ? (
                        movie.origin_country.map((country: string) =>
                            <p key={country}>Pays d&apos;origine : {formatCountry(country)}</p>
                        )
                    ) : (
                        <></>
                    )}
                    <p>Produit par : {movie.production_companies.map((company: any) => company.name).join(', ')}</p>
                    {movie.origin_country[0] != 'FR' ? (
                        <p>Titre original : {movie.original_title}</p>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    )
}