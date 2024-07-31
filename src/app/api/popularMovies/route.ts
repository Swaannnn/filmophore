import { NextResponse } from "next/server";
import {fetchMovies} from "@/utils/fetchMovies";

export async function GET() {
    const url: string = '/movie/popular?language=fr-FR&page=1'
    try {
        const data = await fetchMovies(url);
        return NextResponse.json(data);
    } catch (error) {
        const errorMessage: string = (error as Error).message || 'Unknown error occurred';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
