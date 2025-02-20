import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const movieList = await prisma.movieList.findUnique({
            where: { id },
        });

        if (!movieList) {
            return NextResponse.json({ error: "MovieListCard not found" }, { status: 404 });
        }

        return NextResponse.json(movieList);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId, name, description, moviesId } = body;

        if (!userId || !name) {
            return NextResponse.json({ error: "User ID and name are required" }, { status: 400 });
        }

        const newMovieList = await prisma.movieList.create({
            data: {
                userId,
                name,
                description: description || null,
                moviesId: moviesId || [],
            },
        });

        return NextResponse.json(newMovieList, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { listId, movieId } = body;

        if (!listId || !movieId) {
            return NextResponse.json({ error: "List ID and Movie ID are required" }, { status: 400 });
        }

        const movieList = await prisma.movieList.findUnique({
            where: { id: listId },
            select: { moviesId: true },
        });

        if (!movieList) {
            return NextResponse.json({ error: "Movie list not found" }, { status: 404 });
        }

        if (movieList.moviesId.includes(movieId.toString())) {
            return NextResponse.json({ message: "Movie already in the list" }, { status: 200 });
        }

        const updatedMovieList = await prisma.movieList.update({
            where: { id: listId },
            data: {
                moviesId: { push: movieId.toString() },
            },
        });

        return NextResponse.json(updatedMovieList, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
