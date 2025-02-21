export const fetchMovieLists = async (listIds: string[]) => {
    try {
        const response = await fetch("/api/movie-lists", {
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
        const response = await fetch("/api/movie-list", {
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
