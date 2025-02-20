import {ReactElement, useState} from "react"
import { MovieCardInterface } from "@/models/model"
import {formatDate} from "@/utils/formatter"
import Image from "next/image"
import {useRouter} from "next/navigation";
import {useAuth} from "@/context/AuthContext";
import {Button} from "@/components/Button";
import {addMovieToList} from "@/services/movieService";

interface MovieCardProps {
    movie: MovieCardInterface;
    hideAddMovie?: boolean;
}

export default function MovieCard({movie, hideAddMovie = false} : MovieCardProps): ReactElement{
    const router = useRouter();
    const {user, status, movieLists} = useAuth();
    const [showAddMovie, setShowAddMovie] = useState(false);

    const handleAddToList = async (listId: string) => {
        try {
            const response = await addMovieToList(listId, movie.id);
            if (response) {
                console.log("Film ajouté avec succès !");
            }
            setShowAddMovie(false);
        } catch (error) {
            console.error("Erreur lors de l'ajout du film à la liste", error);
        }
    };

    return (
        <div className="text-black">
            <div className="flex bg-white-primary w-[600px] rounded-lg p-4 my-4">

                <a onClick={() => router.push(`/movie/${movie.id}`)} className="hover:cursor-pointer">
                    <Image
                        className="rounded-md hover:opacity-50"
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        height={360}
                        width={240}
                        alt={movie.title}
                    />
                </a>

                <div key={movie.id} className="w-[400px] p-2">
                    <a onClick={() => router.push(`/movie/${movie.id}`)} className="hover:cursor-pointer">
                        <h3 className="text-xl font-bold line-clamp-[2] hover:text-black-secondary">{movie.title}</h3>
                    </a>
                    <p className="text-sm text-black-secondary">{formatDate(movie.release_date)}</p>
                    <br/>
                    <p className="line-clamp-[5]">{movie.overview}</p>
                    <br />
                    {status === "authenticated" && !hideAddMovie && (
                        <a className="text-[#157c9c] cursor-pointer hover:underline" onClick={() => setShowAddMovie(true)}>Ajouter à une liste</a>
                    )}
                </div>
            </div>

            {showAddMovie && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg w-80">
                        <h3 className="text-lg font-bold">Ajouter à une liste</h3>
                        <ul>
                            {movieLists && movieLists.map((movieList: any) => (
                                <li key={movieList.id} className="flex items-center justify-between p-1 ml-2 mr-2 border-b">
                                    {movieList.name}
                                    <button onClick={() => handleAddToList(movieList.id)} className="text-2xl">+</button>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-center">
                            <a onClick={() => setShowAddMovie(false)}
                               className={"text-center text-[#157c9c] mt-4 cursor-pointer hover:underline"}
                            >Annuler</a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
