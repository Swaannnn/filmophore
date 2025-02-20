"use client"

import {useEffect, useState} from "react";
import {MovieList} from "@/types/types";
import Loader from "@/components/Loader/Loader";
import Unconnect from "@/components/Unconnect";
import {Button} from "@/components/Button";
import MovieListCard from "@/components/MovieCardDetails/MovieListCard";
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";

export default function Dashboard() {
    const { user, status } = useAuth();
    const router = useRouter();

    const [movieLists, setMovieLists] = useState<MovieList[]>([]);
    const [addList, setAddList] = useState(false);
    const [movieName, setMovieName] = useState("");
    const [movieDescription, setMovieDescription] = useState("");

    useEffect(() => {
        async function fetchMovieLists() {
            if (user?.movieListsId) {
                let movielists: MovieList[] = [];
                for (const id of user.movieListsId) {
                    const response = await fetch(`/api/movie-list?id=${id}`);
                    if (response.ok) {
                        const data = await response.json();
                        movielists.push(data);
                    } else {
                        console.error(`Erreur lors de la récupération de la MovieList ${id}`);
                    }
                }
                setMovieLists(movielists);
            }
        }

        fetchMovieLists();
    }, [user]);

    const createList = async (userId: string, name: string, description: string) => {
        const response = await fetch("/api/movie-list", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                name: name,
                description: description,
                moviesId: []
            }),
        });

        if (!response.ok) {
            console.error("Erreur lors de l'ajout de la MovieListCard");
            return null;
        }

        const newList = await response.json();

        router.refresh();

        console.log("MovieListCard ajoutée :", newList);
        return newList;
    }

    const handleAddList = async () => {
        if (user) {
            await createList(user.id, movieName, movieDescription);
        }
        setAddList(false) // ajouter pop up si error
    }

    if (status === "loading") return <Loader />;
    if (status === "unauthenticated") return <Unconnect />;
    if (!user) return <Unconnect />;

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-8">
                {user && (
                    <div>
                        <p>salut {user.username}</p>

                        {movieLists && movieLists.map((movieList: MovieList) => (
                            <div key={movieList.id}>
                                <MovieListCard id={movieList.id} name={movieList.name} description={movieList.description} />
                            </div>
                        ))}

                        <p>-------</p>
                        <Button variant={'primary'} onClick={() => setAddList(true)}>Créer une nouvelle liste</Button>

                        {addList && (
                            <div>
                                <input type="text" placeholder="Nom de la liste" value={movieName} onChange={(event) => setMovieName(event.target.value)} />
                                <input type="text" placeholder="Description de la liste" value={movieDescription} onChange={(event) => setMovieDescription(event.target.value)} />
                                <Button variant={'primary'} onClick={handleAddList}>Créer</Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
