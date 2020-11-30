import { Link } from "gatsby";
import SearchResultCard, { SearchResultDescription } from "components/card/searchResult";
import SongTitleWithArtists from "components/utils/songTitleWithArtists";
import Text from "components/text";
import useImage from "hooks/useImage";

export default function ThemeSearchResultCard({ theme }) {
    const { smallCover } = useImage(theme.anime);

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
            image={smallCover}
            to={`/video/${theme.entries[0].videos[0].filename}`}
        />
    );
}
