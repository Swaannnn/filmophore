import { Button } from "@/components/Button";
import React from "react";

interface AddEditListProps {
    isNewList: boolean;
    movieName: string;
    setMovieName: React.Dispatch<React.SetStateAction<string>>;
    movieDescription: string;
    setMovieDescription: React.Dispatch<React.SetStateAction<string>>;
    errorName: boolean;
    setErrorName: React.Dispatch<React.SetStateAction<boolean>>;
    handleAddList: () => void;
    setAddList: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddEditList({
    isNewList,
    movieName,
    setMovieName,
    movieDescription,
    setMovieDescription,
    errorName,
    setErrorName,
    handleAddList,
    setAddList,
}: AddEditListProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4 text-center">
                    {isNewList ? "Créer une nouvelle liste" : "Modifier la liste"}
                </h2>

                <p className="mb-2">Nom de la liste</p>
                <input
                    type="text"
                    placeholder="Ma sélection incontournable"
                    value={movieName}
                    onChange={(e) => setMovieName(e.target.value)}
                    className={`w-full p-2 bg-gray-800 rounded border border-gray-700 focus:outline-none ${errorName ? 'border-red-500' : ''}`}
                />
                {errorName && (
                    <p className="text-red-500 text-sm">Le nom de la liste est obligatoire</p>
                )}

                <p className="mt-3 mb-2">Description de la liste</p>
                <textarea
                    placeholder="Une collection de films à ne pas manquer"
                    value={movieDescription}
                    onChange={(e) => setMovieDescription(e.target.value)}
                    className="w-full p-2 mb-3 bg-gray-800 rounded border border-gray-700 focus:outline-none resize-none h-24"
                />

                <div className="flex justify-between mt-4">
                    <Button variant="primary" onClick={() => setAddList(false)}>
                        Annuler
                    </Button>
                    <Button variant="secondary" onClick={handleAddList}>
                        {isNewList ? "Créer" : "Modifier"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
