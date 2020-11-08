import React from "react";
import useAniListArtist from "hooks/useAniListArtist";
import SearchResultCard from "components/card/searchResult";

export default function ArtistSearchResultCard({ artist }) {
    const { image } = useAniListArtist(artist);

    return (
        <SearchResultCard
            title={artist.name}
            description={artist.songs ? `Artist • ${artist.songs.length} songs` : "Artist"}
            image={image}
        />
    );
}
