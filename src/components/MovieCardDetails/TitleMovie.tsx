import Image from "next/image";
import React from "react";

interface TitleMovieProps {
    asBackdrop: boolean,
    backdrop_path: string,
    title: string
}

export default function TitleMovie({asBackdrop, backdrop_path, title}: TitleMovieProps): React.ReactElement {
    return (
        <div className="pt-4">
            {asBackdrop ? (
                    <div className="relative flex flex-col justify-center items-center max-w-full">
                        <Image
                            className="rounded-md"
                            src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`}
                            height={360}
                            width={1000}
                            alt={title}
                        />
                        <p className="absolute bottom-4 left-6 text-black font-bold text-7xl bg-white/70 px-8">{title}</p>
                    </div>
                ) :
                <p className="text-black font-bold text-7xl bg-white/70 px-8">{title}</p>
            }
        </div>
    )
}