import {MovieList} from "@/types/types";

export const updateList = async (id: string, movieListId: string, movieName: string, movieDescription: string) => {
    const response = await fetch(`/api/user/movie-list?id=${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            listId: movieListId,
            name: movieName,
            description: movieDescription,
        }),
    });

    if (response.ok) {
        console.log("Liste modifiée avec succès");
        return await response.json(); // Retourne la liste mise à jour
    } else {
        console.error('Erreur lors de la modification de la liste');
        return null;
    }
};

export const deleteList = async (id: string) => {
    const response = await fetch(`/api/user/movie-list?id=${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        console.log('Liste supprimée avec succès');
        return response.json();
    } else {
        console.error('Erreur lors de la suppression de la liste');
        return null;
    }
};

export const fetchMovieList = async (id: string) => {
    const response = await fetch(`/api/user/movie-list?id=${id}`);
    if (response.ok) {
        return await response.json();
    } else {
        console.error(`Erreur lors de la récupération de la MovieList ${id}`);
        return null;
    }
};

export const fetchMovies = async (movieList: { moviesId: string[] }) => {
    let allMovies = [];
    for (const movieId of movieList.moviesId) {
        const res: Response = await fetch(`/api/movie/${movieId}`);
        const result = await res.json();
        allMovies.push(result);
    }
    return allMovies;
};

export const fetchMovieLists = async (userIds: string[]) => {
    if (!userIds || userIds.length === 0) return [];

    let movielists: MovieList[] = [];
    for (const id of userIds) {
        const response = await fetch(`/api/user/movie-list?id=${id}`);
        if (response.ok) {
            const data = await response.json();
            movielists.push(data);
        } else {
            console.error(`Erreur lors de la récupération de la MovieList ${id}`);
        }
    }
    return movielists;
};

export const createMovieList = async (userId: string, name: string, description: string) => {
    const response = await fetch("/api/user/movie-list", {
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
        console.error("Erreur lors de l'ajout de la MovieList");
        return null;
    }

    return await response.json();
};

export const deleteMovieFromList = async (listId: string, movieId: string) => {
    try {
        const response = await fetch(`/api/user/movie-list/${listId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ movieId }),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error("Erreur lors de la suppression du film.")
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}
