import {Link} from "gatsby";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisH} from "@fortawesome/free-solid-svg-icons";
import Button from "components/button";
import Flex from "components/flex";
import Text from "components/text";
import SearchResultCard, {SearchResultDescription} from "components/card/searchResult";
import Elevator from "components/elevator";
import ButtonPlay from "components/button/play";
import useImage from "hooks/useImage";
import createVideoSlug from "utils/createVideoSlug";

export default function AnimeSearchResultCard({ anime, hideThemes = false }) {
    const { smallCover } = useImage(anime);

    let premiere = anime.year;
    let premiereLink = `/year/${anime.year}`;
    if (anime.season) {
        premiere = anime.season + " " + premiere;
        premiereLink += `/${anime.season.toLowerCase()}`;
    }

    let description = (
        <SearchResultDescription>
            <span>Anime</span>
            {!!premiere && (
                <Link to={premiereLink}>
                    <Text link>{premiere}</Text>
                </Link>
            )}
            <span>{anime.themes.length} themes</span>
        </SearchResultDescription>
    );

    return (
        <SearchResultCard
            title={anime.name}
            description={description}
            image={smallCover}
            to={`/anime/${anime.slug}`}
        >
            {!hideThemes && (
                <Elevator>
                    <Flex row wrap gapsBoth="0.75rem">
                        {anime.themes
                            .slice(0, 4)
                            .filter((theme) => theme.entries.length && theme.entries[0].videos.length)
                            .map((theme) => {
                                const entry = theme.entries[0];
                                const video = entry.videos[0];
                                const videoSlug = createVideoSlug(theme, entry, video);

                                return (
                                    <ButtonPlay key={theme.id} to={`/anime/${anime.slug}/${videoSlug}`}>
                                        <Text small block>{theme.slug}</Text>
                                    </ButtonPlay>
                                );
                            })
                        }
                        {anime.themes.length > 4 && (
                            <Button icon title="Show all themes">
                                <FontAwesomeIcon icon={faEllipsisH} fixedWidth/>
                            </Button>
                        )}
                    </Flex>
                </Elevator>
            )}
        </SearchResultCard>
    );
}
