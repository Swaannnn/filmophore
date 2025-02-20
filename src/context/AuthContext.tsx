"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { User } from "@/types/types";
import { fetchMovieLists } from "@/services/movieService";

interface MovieList {
    id: string;
    name: string;
}

interface AuthContextProps {
    user: User | null;
    status: "authenticated" | "unauthenticated" | "loading";
    movieLists?: MovieList[];
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const [user, setUser] = useState<User | null>(null);
    const [movieLists, setMovieLists] = useState<MovieList[]>([]);

    useEffect(() => {
        if (session?.user) {
            setUser(session.user as User);
        }
    }, [session]);

    useEffect(() => {
        if (user?.movieListsId.length) {
            fetchMovieLists(user.movieListsId).then((lists) => {
                setMovieLists(lists.map((list: MovieList) => ({ id: list.id, name: list.name })));
            });
        }
    }, [user?.movieListsId]);

    return (
        <AuthContext.Provider value={{ user, status, movieLists }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
