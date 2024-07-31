import { MovieInterface } from "@/models/model"
import { ReactElement } from "react"
import Image from "next/image"
import { formatDate, formatRuntime, formatCountry } from "@/utils/formatter";

interface MovieCardDetailsProps {
    movie: MovieInterface
}

export default function MovieCardDetails({movie} : MovieCardDetailsProps): ReactElement{
    let asBackdrop: boolean = movie.backdrop_path != null
    return (
        <div className="w-[1000px] mx-auto">
            <div className="pt-4">
                {asBackdrop ? (
                    <div className="relative flex flex-col justify-center items-center max-w-full">
                        <Image
                            className="rounded-md"
                            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                            height={360}
                            width={1000}
                            alt={movie.title}
                        />
                        <p className="absolute bottom-4 left-6 text-black font-bold text-7xl">{movie.title}</p>
                    </div>
                ) : <p>{movie.title}</p>}
            </div>

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
                    <div className="pl-4">
                        {movie.status == 'Released' ? (
                            <p>Sorti le {formatDate(movie.release_date)}</p>
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
            <div className="pt-10">
                {movie.belongs_to_collection ? (
                    <div>
                        <p>Collection : {movie.belongs_to_collection.name}</p>
                        {/*    TODO: ajouter la collection*/}
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}
