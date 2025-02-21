export const fetchMovieLists = async (listIds: string[]) => {
    try {
        const response = await fetch("/api/user/movie-lists", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ listIds }),
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des listes");
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération des listes de films :", error);
        return [];
    }
};

export const addMovieToList = async (listId: string, movieId: number) => {
    try {
        const response = await fetch("/api/user/movie-list", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ listId, movieId }),
        });

        const data = await response.json();
        console.log(data);
        if (!response.ok) throw new Error(data.error || "Erreur lors de l'ajout du film");
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const fetchMovieById = async (id: string) => {
    try {
        const response = await fetch(`/api/movie/${id}`);

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération du film");
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération du film :", error);
        return null;
    }
};

export const searchMovies = async (query: string) => {
    try {
        const response = await fetch(`/api/movie/search?query=${query}`);

        if (!response.ok) {
            throw new Error("Erreur lors de la recherche de films.");
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la recherche de films :", error);
        return null;
    }
};

export const fetchPopularMovies = async () => {
    try {
        const response = await fetch("/api/popularMovies")

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des films populaires")
        }

        return await response.json()
    } catch (error) {
        console.error("Erreur lors de la récupération des films populaires :", error)
        return null
    }
}

export const fetchUpcomingMovies = async () => {
    try {
        const response = await fetch("/api/upcomingMovies")

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des films à venir")
        }

        return await response.json()
    } catch (error) {
        console.error("Erreur lors de la récupération des films à venir :", error)
        return null
    }
}
