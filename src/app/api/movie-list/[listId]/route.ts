import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: NextRequest, { params }: { params: { listId: string } }) {
    try {
        const { movieId } = await req.json();

        if (!movieId) {
            return NextResponse.json({ error: "Movie ID is required" }, { status: 400 });
        }

        const movieList = await prisma.movieList.findUnique({
            where: { id: params.listId },
            select: { moviesId: true },
        });

        if (!movieList) {
            return NextResponse.json({ error: "Movie list not found" }, { status: 404 });
        }

        if (!movieList.moviesId.includes(movieId.toString())) {
            return NextResponse.json({ message: "Movie not in the list" }, { status: 404 });
        }

        const updatedMovieList = await prisma.movieList.update({
            where: { id: params.listId },
            data: {
                moviesId: { set: movieList.moviesId.filter((id) => id !== movieId.toString()) },
            },
        });

        return NextResponse.json(updatedMovieList, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
