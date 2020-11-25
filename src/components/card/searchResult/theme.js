import {Link} from "gatsby";
import useAniList from "hooks/useAniList";
import SearchResultCard, {SearchResultDescription} from "components/card/searchResult";
import SongTitleWithArtists from "components/utils/songTitleWithArtists";
import useAnime from "hooks/useAnime";
import Text from "components/text";

export default function ThemeSearchResultCard({ theme }) {
    const anime = useAnime(theme.anime.slug);
    const { image } = useAniList(anime);

    if (!theme.entries[0] || !theme.entries[0].videos[0]) {
        return null;
    }

    const description = (
        <SearchResultDescription>
            <span>Theme</span>
            <span>{theme.slug}</span>
            <Link to={`/anime/${theme.anime.slug}`}>
                <Text link>{theme.anime.name}</Text>
            </Link>
        </SearchResultDescription>
    );

    return (
        <SearchResultCard
            title={<SongTitleWithArtists song={theme.song}/>}
            description={description}
            image={image}
            to={`/video/${theme.entries[0].videos[0].filename}`}
        />
    );
}
