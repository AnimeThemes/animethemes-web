import {Link} from "gatsby";
import useAniList from "hooks/useAniList";
import SearchResultCard from "components/card/searchResult";
import SongTitleWithArtists from "components/utils/songTitleWithArtists";
import useAnime from "hooks/useAnime";
import Text from "components/text";

export default function ThemeSearchResultCard({ theme }) {
    const anime = useAnime(theme.anime.slug);
    const { image } = useAniList(anime);

    return (
        <SearchResultCard
            title={<SongTitleWithArtists song={theme.song}/>}
            description={<>
                <span>Theme • {theme.slug} • </span>
                <Link to={`/anime/${theme.anime.slug}`}>
                    <Text link>{theme.anime.name}</Text>
                </Link>
            </>}
            image={image}
            to={`/video/${theme.entries[0].videos[0].filename}`}
        />
    );
}
