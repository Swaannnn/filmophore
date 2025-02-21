"use client"

import React, { useEffect, useState } from "react";
import { MovieList } from "@/types/types";
import { useAuth } from "@/context/AuthContext";
import { MovieCardInterface } from "@/models/model";
import MovieCard from "@/components/MovieCard";
import Loader from "@/components/Loader/Loader";
import { Button } from "@/components/Button";
import AddEditList from "@/components/AddEditList";
import {useRouter} from "next/navigation";
import MovieCardList from "@/components/MovieCardDetails/MovieCardList";

export default function List({ params }: { params: { id: string } }) {
    const id: string = params.id;
    const router = useRouter();
    const { user, status } = useAuth();

    const [movieList, setMovieList] = useState<MovieList>();
    const [movies, setMovies] = useState<MovieCardInterface[]>([]);
    const [loading, setLoading] = useState(true);

    const [editList, setEditList] = useState(false);
    const [movieName, setMovieName] = useState("");
    const [movieDescription, setMovieDescription] = useState("");
    const [errorName, setErrorName] = useState(false);

    const [deleteList, setDeleteList] = useState(false);

    const handleEditList = async () => {
        if (movieName === "") {
            setErrorName(true);
            return;
        }
        if (user && movieList) {
            const response = await fetch(`/api/movie-list?id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    listId: movieList.id,
                    name: movieName,
                    description: movieDescription,
                }),
            });

            if (response.ok) {
                const updatedList = await response.json();
                setMovieList(updatedList);
                window.location.reload();
            } else {
                console.error('Erreur lors de la modification de la liste');
            }
        }
        setEditList(false);
    };

    const handleDeleteList = async () => {
        if (user) {
            const response = await fetch(`/api/movie-list?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('Liste supprimée avec succès');
                router.push('/dashboard');
            } else {
                console.error('Erreur lors de la suppression de la liste');
            }
        }
        setDeleteList(false);
    };

    useEffect(() => {
        async function fetchMovieList() {
            const response = await fetch(`/api/movie-list?id=${id}`);
            if (response.ok) {
                const data = await response.json();
                setMovieList(data);
                setMovieName(data.name);
                setMovieDescription(data.description);
            } else {
                console.error(`Erreur lors de la récupération de la MovieList ${id}`);
            }
        }

        fetchMovieList();
    }, [id]);

    useEffect(() => {
        async function fetchData() {
            if (movieList) {
                let allMovies = [];
                for (const movieId of movieList.moviesId) {
                    const res: Response = await fetch(`/api/movie/${movieId}`);
                    const result = await res.json();
                    allMovies.push(result);
                }
                setMovies(allMovies);
                setLoading(false);
            }
        }

        fetchData();
    }, [movieList]);

    if (loading) return <Loader />;

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-8">
                {user && (
                    <div>
                        {movieList && (
                            <div>
                                <div className="flex flex-col justify-center text-center">
                                    <p className="text-3xl">{movieList.name}</p>
                                    <p className="text-2xl">{movieList.description}</p>
                                </div>
                                {movieList.name !== "Favoris" && (
                                    <div className="flex justify-center gap-2">
                                        <Button
                                            variant={'outline'}
                                            onClick={() => setEditList(true)}
                                        >Modifier</Button>
                                        <Button
                                            variant={'outline'}
                                            onClick={() => setDeleteList(true)}
                                        >Supprimer</Button>
                                    </div>
                                )}
                                <div>
                                    {movies.length > 0 ? (
                                        movies.map((movie: MovieCardInterface) => (
                                            <MovieCardList key={movie.id} listId={movieList.id} movie={movie}/>
                                        ))
                                    ) : (
                                        <p className="text-gray-300 text-center mt-4">Aucun film dans cette liste</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {editList && (
                            <AddEditList
                                isNewList={false}
                                movieName={movieName}
                                setMovieName={setMovieName}
                                movieDescription={movieDescription}
                                setMovieDescription={setMovieDescription}
                                errorName={errorName}
                                setErrorName={setErrorName}
                                handleAddList={handleEditList}
                                setAddList={setEditList}
                            />
                        )}

                        {deleteList && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96">
                                    <h2 className="text-xl font-semibold mb-4 text-center">
                                        Confirmation de suppression
                                    </h2>

                                    <p className="text-center mb-4">Êtes-vous sûr de vouloir supprimer cette liste ?</p>

                                    <div className="flex justify-between gap-4">
                                        <Button
                                            variant="primary"
                                            onClick={() => setDeleteList(false)}
                                            className="w-full"
                                        >
                                            Annuler
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            onClick={handleDeleteList}
                                            className="w-full"
                                        >
                                            Supprimer
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                )}
            </div>
        </div>
    );
}
