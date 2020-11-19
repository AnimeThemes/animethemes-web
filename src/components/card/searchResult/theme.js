import React from "react";
import useAniList from "hooks/useAniList";
import SearchResultCard from "components/card/searchResult";
import SongTitleWithArtists from "components/utils/songTitleWithArtists";
import useAnime from "hooks/useAnime";

export default function ThemeSearchResultCard({ theme }) {
    const anime = useAnime(theme.anime.slug);
    const { image } = useAniList(anime);

    return (
        <SearchResultCard
            title={<SongTitleWithArtists song={theme.song}/>}
            description={`Theme • ${theme.slug} • ${theme.anime.name}`}
            image={image}
            to={`/video/${theme.entries[0].videos[0].filename}`}
        />
    );
}
