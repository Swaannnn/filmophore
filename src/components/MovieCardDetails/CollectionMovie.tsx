import React from "react";

interface CollectionMovieProps {
    belongs_to_collection: any
}

export default function CollectionMovie({belongs_to_collection}: CollectionMovieProps): React.ReactElement {
    return (
        <div className="pt-10">
            {belongs_to_collection ? (
                <div>
                    <p>Collection : {belongs_to_collection.name}</p>
                    {/*    TODO: ajouter la collection*/}
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}