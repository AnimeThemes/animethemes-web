import React from "react";
import useAniListArtist from "hooks/useAniListArtist";
import SearchResultCard, {SearchResultDescription} from "components/card/searchResult";

export default function ArtistSearchResultCard({ artist }) {
    const { image } = useAniListArtist(artist);

    const description = (
        <SearchResultDescription>
            <span>Artist</span>
            {!!artist.performances && (
                <span>{artist.performances.length} songs</span>
            )}
        </SearchResultDescription>
    );

    return (
        <SearchResultCard
            title={artist.name}
            description={description}
            image={image}
            to={`/artist/${artist.slug}`}
        />
    );
}
