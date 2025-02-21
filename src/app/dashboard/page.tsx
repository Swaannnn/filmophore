"use client";

import React, {useEffect, useState} from "react";
import {MovieList} from "@/types/types";
import Loader from "@/components/Loader/Loader";
import Unconnect from "@/components/Unconnect";
import {Button} from "@/components/Button";
import MovieListCard from "@/components/MovieCardDetails/MovieListCard";
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";
import AddEditList from "@/components/AddEditList";

export default function Dashboard() {
    const { user, status } = useAuth();
    const router = useRouter();

    const [movieLists, setMovieLists] = useState<MovieList[]>([]);
    const [addList, setAddList] = useState(false);
    const [movieName, setMovieName] = useState("");
    const [movieDescription, setMovieDescription] = useState("");
    const [errorName, setErrorName] = useState(false);
    const [loading, setLoading] = useState(true);

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
                setLoading(false);
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
                moviesId: [],
            }),
        });

        if (!response.ok) {
            console.error("Erreur lors de l'ajout de la MovieListCard");
            return null;
        }

        return await response.json();
    };

    const handleAddList = async () => {
        if (movieName === "") {
            setErrorName(true);
            return;
        }
        if (user) {
            await createList(user.id, movieName, movieDescription);
        }
        setAddList(false);
        window.location.reload();
    };

    if (status === "loading") return <Loader />;
    if (status === "unauthenticated") return <Unconnect />;
    if (!user) return <Unconnect />;

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-8">
                {user && (
                    <div>
                        <h1 className="text-3xl text-center pt-4 pb-6">Mes listes de films :</h1>
                        {loading && <p className="pb-4">Chargement des listes...</p>}
                        {movieLists &&
                            movieLists.map((movieList: MovieList) => (
                                <div key={movieList.id}>
                                    <MovieListCard
                                        id={movieList.id}
                                        name={movieList.name}
                                        description={movieList.description}
                                    />
                                    <div className="h-4"></div>
                                </div>
                            ))}

                        <div className="text-center mb-4">
                            <Button variant={"primary"} onClick={() => setAddList(true)}>
                                Créer une nouvelle liste
                            </Button>
                        </div>

                        {addList && (
                            <AddEditList
                                isNewList={true}
                                movieName={movieName}
                                setMovieName={setMovieName}
                                movieDescription={movieDescription}
                                setMovieDescription={setMovieDescription}
                                errorName={errorName}
                                setErrorName={setErrorName}
                                handleAddList={handleAddList}
                                setAddList={setAddList}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
