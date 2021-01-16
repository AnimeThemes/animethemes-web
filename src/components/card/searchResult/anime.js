import {Link} from "gatsby";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisH} from "@fortawesome/free-solid-svg-icons";
import Button from "components/button";
import Text from "components/text";
import SearchResultCard, {SearchResultDescription} from "components/card/searchResult";
import Elevator from "components/elevator";
import ButtonPlay from "components/button/play";
import useImage from "hooks/useImage";
import createVideoSlug from "utils/createVideoSlug";
import { Flex } from "components/flex";

export default function AnimeSearchResultCard({ anime, hideThemes = false }) {
    const { smallCover } = useImage(anime);

    const animeLink = `/anime/${anime.slug}`;

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
            to={animeLink}
        >
            {!hideThemes && (
                <Elevator>
                    <Flex flexWrap="wrap" gapsBoth="0.75rem">
                        {anime.themes
                            .slice(0, 4)
                            .filter((theme) => theme.entries.length && theme.entries[0].videos.length)
                            .map((theme) => {
                                const entry = theme.entries[0];
                                const video = entry.videos[0];
                                const videoSlug = createVideoSlug(theme, entry, video);

                                return (
                                    <ButtonPlay key={theme.slug} to={`/anime/${anime.slug}/${videoSlug}`}>
                                        <Text small block>{theme.slug}</Text>
                                    </ButtonPlay>
                                );
                            })
                        }
                        {anime.themes.length > 4 && (
                            <Button icon title="Show all themes" to={animeLink}>
                                <FontAwesomeIcon icon={faEllipsisH} fixedWidth/>
                            </Button>
                        )}
                    </Flex>
                </Elevator>
            )}
        </SearchResultCard>
    );
}
