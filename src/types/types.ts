export interface MovieList {
    id: string;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    moviesId: string[];
}

export interface User {
    id: string;
    username: string;
    email?: string;
    image?: string;
    movieListsId: string[];
}
