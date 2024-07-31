import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const query: string | null = req.nextUrl.searchParams.get('query')

    if (!query) {
        return NextResponse.json({error: 'Query parameter is required'}, {status: 400})
    }

    const baseUrl: string = 'https://api.themoviedb.org/3'
    const url: string = `${baseUrl}/search/movie?query=${query}&include_adult=true&language=fr-FR`

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN}`
        }
    }
    const response: Response = await fetch(url, options)
    const data = await response.json()

    return NextResponse.json(data)
}
