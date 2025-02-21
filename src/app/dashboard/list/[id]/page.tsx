"use client";

import { updateList, deleteList, fetchMovieList, fetchMovies } from "@/services/listService";
import {useRouter} from "next/navigation";
import {useAuth} from "@/context/AuthContext";
import {useEffect, useState, useCallback} from "react";
import {MovieList} from "@/types/types";
import {MovieCardInterface} from "@/models/model";
import Loader from "@/components/Loader/Loader";
import {Button} from "@/components/Button";
import MovieCardList from "@/components/MovieCardDetails/MovieCardList";
import AddEditList from "@/components/AddEditList";

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

    const [deleteListPopUp, setDeleteListPopUp] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const data = await fetchMovieList(id);
            if (data) {
                setMovieList(data);
                setMovieName(data.name);
                setMovieDescription(data.description);

                const allMovies = await fetchMovies(data);
                setMovies(allMovies);
            }
        } catch (err) {
            console.error("Erreur lors de la récupération de la liste");
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleEditList = async () => {
        if (movieName === "") {
            setErrorName(true);
            return;
        }
        if (user && movieList) {
            const updatedList = await updateList(id, movieList.id, movieName, movieDescription);
            if (updatedList) {
                setMovieList(updatedList);
            } else {
                console.error('Erreur lors de la modification de la liste');
            }
        }
        setEditList(false);
    };

    const handleDeleteList = async () => {
        if (user) {
            const res = await deleteList(id);
            if (res) {
                router.push('/dashboard');
            } else {
                console.error('Erreur lors de la suppression de la liste');
            }
        }
        setDeleteListPopUp(false);
    };

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
                                            onClick={() => setDeleteListPopUp(true)}
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

                        {deleteListPopUp && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96">
                                    <h2 className="text-xl font-semibold mb-4 text-center">
                                        Confirmation de suppression
                                    </h2>

                                    <p className="text-center mb-4">Êtes-vous sûr de vouloir supprimer cette liste ?</p>

                                    <div className="flex justify-between gap-4">
                                        <Button
                                            variant="primary"
                                            onClick={() => setDeleteListPopUp(false)}
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
