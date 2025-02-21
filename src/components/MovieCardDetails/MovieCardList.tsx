import React, { ReactElement, useState } from "react";
import { MovieCardInterface } from "@/models/model";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/Button";

interface MovieCardProps {
    movie: MovieCardInterface;
    listId: string;
}

export default function MovieCardList({ movie, listId }: MovieCardProps): ReactElement {
    const router = useRouter();
    const { user, status, movieLists } = useAuth();
    const [popUpDelete, setPopUpDelete] = useState(false);

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/movie-list/${listId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ movieId: movie.id }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Film supprimé avec succès", data);
                window.location.reload();
            } else {
                console.error("Erreur lors de la suppression:", data.error);
            }
        } catch (error) {
            console.error("Erreur interne:", error);
        }
    };


    return (
        <div className="text-black">
            <div className="flex bg-white-primary w-[600px] rounded-md p-2 my-2">
                <a onClick={() => router.push(`/movie/${movie.id}`)} className="hover:cursor-pointer">
                    <Image
                        className="rounded-md hover:opacity-50"
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        height={120}
                        width={80}
                        alt={movie.title}
                    />
                </a>

                <div key={movie.id} className="p-2">
                    <a onClick={() => router.push(`/movie/${movie.id}`)} className="hover:cursor-pointer">
                        <h3 className="text-xl font-bold line-clamp-[2] hover:text-black-secondary">{movie.title}</h3>
                    </a>
                    <Button
                        variant="outline"
                        onClick={() => setPopUpDelete(true)}
                    >
                        Supprimer
                    </Button>
                </div>
            </div>
            {popUpDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4 text-center">
                            Confirmation de suppression
                        </h2>

                        <p className="text-center mb-4">Êtes-vous sûr de vouloir supprimer <b>{movie.title}</b> de cette liste ?</p>

                        <div className="flex justify-between gap-4">
                            <Button
                                variant="primary"
                                onClick={() => setPopUpDelete(false)}
                                className="w-full"
                            >
                                Annuler
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={handleDelete}
                                className="w-full"
                            >
                                Supprimer
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
