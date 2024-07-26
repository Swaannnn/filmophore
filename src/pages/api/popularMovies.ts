import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const url = 'https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=1'
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTBjYzkyMmJiMzBlMGI0ODJkNWFmZDVhYjQ5NTdkOSIsIm5iZiI6MTcyMTk0NjQyNC4zMjcwMjMsInN1YiI6IjY2YTI4MGYwNTgyMDVmM2RkNjI2NWYyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UhROjWBiX3tnblO4Szlq_S58zMaMJwR9kmxyYneIJds'
        }
    }
    const response = await fetch(url, options)
    const data = await response.json()

    res.status(200).json(data)
}


// fetch(url, options)
//     .then(res => res.json())
//     .then(json => console.log(json))
//     .catch(err => console.error('error:' + err));