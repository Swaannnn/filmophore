import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const id: string | undefined = req.nextUrl.pathname.split('/').pop()
    const url: string = `https://api.themoviedb.org/3/movie/${id}?language=fr-FR`
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN}`
        }
    }
    const response = await fetch(url, options)
    const data = await response.json()

    return NextResponse.json(data)
}
