export interface MovieCardInterface {
    id: number
    title: string
    overview: string
    release_date: string
    poster_path: string
}

interface productionCountries {
    iso_3166_1: string
    name: string
}

interface genre {
    id: number
    name: string
}

interface productionCompanies {
    name: string[]
    logo_path: string[]
    headquarters: string[]
    origin_country: string[]
}

interface collection {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
}

export interface MovieInterface {
    id: number
    title: string
    original_title: string
    tagline: string
    overview: string
    release_date: string
    status: string
    poster_path: string
    backdrop_path: string
    production_countries: productionCountries[]
    origin_country: string[]
    runtime: number
    genres: genre[]
    production_companies: productionCompanies[]
    belongs_to_collection: collection // https://api.themoviedb.org/3/collection
}
