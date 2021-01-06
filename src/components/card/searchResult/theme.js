import { Link } from "gatsby";
import SearchResultCard, { SearchResultDescription } from "components/card/searchResult";
import SongTitleWithArtists from "components/utils/songTitleWithArtists";
import Text from "components/text";
import useImage from "hooks/useImage";
import createVideoSlug from "utils/createVideoSlug";

export default function ThemeSearchResultCard({ theme }) {
    const { smallCover } = useImage(theme.anime);

    if (!theme.entries.length) {
        return null;
    }

    const entry = theme.entries[0];

    if (!entry.videos.length) {
        return null;
    }

    const video = entry.videos[0];
    const videoSlug = createVideoSlug(theme, entry, video);

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
            to={`/anime/${theme.anime.slug}/${videoSlug}`}
        />
    );
}
