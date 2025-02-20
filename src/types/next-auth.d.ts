// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            username: string;
            id: string;
            movieListsId: string[];
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        username: string;
        id: string;
        movieListsId: string[];
    }
}
