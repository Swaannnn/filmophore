import { MovieInterface } from "@/models/model"
import { ReactElement } from "react"
import TitleMovie from "@/components/MovieCardDetails/TitleMovie";
import CollectionMovie from "@/components/MovieCardDetails/CollectionMovie";
import DetailsMovie from "@/components/MovieCardDetails/DetailsMovie";

interface MovieCardDetailsProps {
    movie: MovieInterface
}

export default function MovieCardDetails({movie} : MovieCardDetailsProps): ReactElement {
    let asBackdrop: boolean = movie.backdrop_path != null
    return (
        <div className="w-[1000px] mx-auto">
            <TitleMovie title={movie.title} backdrop_path={movie.backdrop_path} asBackdrop={asBackdrop}/>

            <DetailsMovie movie={movie}/>

            <CollectionMovie belongs_to_collection={movie.belongs_to_collection}/>
        </div>
    )
}