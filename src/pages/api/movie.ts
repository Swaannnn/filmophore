// import { NextApiRequest, NextApiResponse } from 'next'
//
// id ?
//
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     const url = `https://api.themoviedb.org/3/movie/${id}?language=fr-FR`
//     const options = {
//         method: 'GET',
//         headers: {
//             accept: 'application/json',
//             Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTBjYzkyMmJiMzBlMGI0ODJkNWFmZDVhYjQ5NTdkOSIsIm5iZiI6MTcyMTk0NjQyNC4zMjcwMjMsInN1YiI6IjY2YTI4MGYwNTgyMDVmM2RkNjI2NWYyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UhROjWBiX3tnblO4Szlq_S58zMaMJwR9kmxyYneIJds'
//         }
//     }
//     const response = await fetch(url, options)
//     const data = await response.json()
//
//     res.status(200).json(data)
// }

// recuperer id du film voulu
// pour le passer en parametre de l'api ici