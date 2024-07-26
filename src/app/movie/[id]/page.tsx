import {applyNextWorkerFixture} from "next/dist/experimental/testmode/playwright/next-worker-fixture";

// function fetchMovie(id: string) {
//     const response = await fetch()
// }

export default async function Movie({ params } : { params: {id: string} }) {
    const id = params
    // const movie = await fetchMovie(id)

    return (
        <div></div>
    )
}