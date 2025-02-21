"use client";

import React, { useEffect, useState, useCallback } from "react";
import { MovieList } from "@/types/types";
import Loader from "@/components/Loader/Loader";
import Unconnect from "@/components/Unconnect";
import { Button } from "@/components/Button";
import MovieListCard from "@/components/MovieCardDetails/MovieListCard";
import { useAuth } from "@/context/AuthContext";
import AddEditList from "@/components/AddEditList";
import { fetchMovieLists, createMovieList } from "@/services/listService";

export default function Dashboard() {
    const { user, status } = useAuth();
    const [movieLists, setMovieLists] = useState<MovieList[]>([]);
    const [addList, setAddList] = useState(false);
    const [movieName, setMovieName] = useState("");
    const [movieDescription, setMovieDescription] = useState("");
    const [errorName, setErrorName] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMovieListsData = useCallback(async () => {
        if (!user?.movieListsId || user.movieListsId.length === 0) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const lists = await fetchMovieLists(user.movieListsId);
            setMovieLists(lists);
        } catch (err) {
            setError("Erreur lors du chargement des listes.");
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchMovieListsData();
    }, [fetchMovieListsData]);

    const handleAddList = async () => {
        if (!movieName.trim()) {
            setErrorName(true);
            return;
        }

        try {
            setLoading(true);
            const newList = await createMovieList(user!.id, movieName, movieDescription);
            if (newList) {
                setMovieLists((prev) => [newList, ...prev]);
            }
        } catch (err) {
            setError("Erreur lors de la création de la liste.");
        } finally {
            setLoading(false);
            setAddList(false);
            setMovieName("");
            setMovieDescription("");
            setErrorName(false);
        }
    };

    if (status === "loading") return <Loader />;
    if (status === "unauthenticated" || !user) return <Unconnect />;

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-3xl text-center pt-4 pb-6">Mes listes de films :</h1>

                {error && <p className="text-red-500">{error}</p>}

                {loading ? (
                    <p className="pb-4">Chargement des listes...</p>
                ) : (
                    movieLists.length > 0 ? (
                        movieLists.map((movieList) => (
                            <div key={movieList.id} className="mb-4">
                                <MovieListCard
                                    id={movieList.id}
                                    name={movieList.name}
                                    description={movieList.description}
                                />
                            </div>
                        ))
                    ) : (
                        <p>Aucune liste trouvée.</p>
                    )
                )}

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
        </div>
    );
}
