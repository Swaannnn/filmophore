"use client"

import React, {useEffect, useState} from "react";
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
    const [errorName, setErrorName] = useState(false);

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
        console.log("MovieListCard ajoutée :", newList);
        return newList;
    }

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setErrorName(false);
        setMovieName(event.target.value)
    }

    const handleAddList = async () => {
        if (movieName === "") {
            setErrorName(true);
            return;
        }
        if (user) {
            await createList(user.id, movieName, movieDescription);
        }
        setAddList(false)
        window.location.reload(); // à voir si on peut faire mieux ici
    }

    if (status === "loading") return <Loader />;
    if (status === "unauthenticated") return <Unconnect />;
    if (!user) return <Unconnect />;

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-8">
                {user && (
                    <div>
                        <h1 className="text-3xl text-center pt-4 pb-6">Mes listes de films :</h1>
                        {movieLists && movieLists.map((movieList: MovieList) => (
                            <div key={movieList.id}>
                                <MovieListCard id={movieList.id} name={movieList.name} description={movieList.description} />
                                <div className="h-4"></div>
                            </div>
                        ))}

                        <div className="text-center mb-4">
                            <Button variant={'primary'} onClick={() => setAddList(true)}>Créer une nouvelle liste</Button>
                        </div>

                        {addList && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96">
                                    <h2 className="text-xl font-semibold mb-4 text-center">Créer une nouvelle liste</h2>

                                    <p className="mb-2">Nom de la liste</p>
                                    <input
                                        type="text"
                                        placeholder="Ma sélection incontournable"
                                        value={movieName}
                                        onChange={handleChangeName}
                                        className={`w-full p-2 bg-gray-800 rounded border border-gray-700 focus:outline-none ${errorName ? 'border-red-500' : ''}`}
                                    />
                                    {errorName && (
                                        <p className="text-red-500 text-sm">Le nom de la liste est obligatoire</p>
                                    )}

                                    <p className="mt-3 mb-2">Description de la liste</p>
                                    <textarea
                                        placeholder="Une collection de films à ne pas manquer"
                                        value={movieDescription}
                                        onChange={(event) => setMovieDescription(event.target.value)}
                                        className="w-full p-2 mb-3 bg-gray-800 rounded border border-gray-700 focus:outline-none resize-none h-24"
                                    />

                                    <div className="flex justify-between mt-4">
                                        <Button variant="primary" onClick={() => setAddList(false)}>Annuler</Button>
                                        <Button variant="secondary" onClick={handleAddList}>Créer</Button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                )}
            </div>
        </div>
    )
}
