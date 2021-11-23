import Link from "next/link";
import { faEllipsisH, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Button } from "components/button";
import { Text } from "components/text";
import useImage from "hooks/useImage";
import createVideoSlug from "utils/createVideoSlug";
import { Flex } from "components/box";
import { Icon } from "components/icon";
import { SummaryCard } from "components/card";
import { chain, themeIndexComparator, themeTypeComparator } from "utils/comparators";

export function AnimeSummaryCard({ anime, hideThemes = false, maxThemes = 4 }) {
    const { smallCover } = useImage(anime);

    const animeLink = `/anime/${anime.slug}`;

    let premiere = String(anime.year);
    let premiereLink = `/year/${anime.year}`;
    if (anime.season) {
        premiere = anime.season + " " + premiere;
        premiereLink += `/${anime.season.toLowerCase()}`;
    }

    let description = (
        <SummaryCard.Description>
            <span>Anime</span>
            {!!anime.year && (
                <Link href={premiereLink} passHref>
                    <Text as="a" link>{premiere}</Text>
                </Link>
            )}
            <span>{anime.themes.length} themes</span>
        </SummaryCard.Description>
    );

    return (
        <SummaryCard
            title={anime.name}
            description={description}
            image={smallCover}
            to={animeLink}
        >
            {!hideThemes && (
                <Flex display={["none", "flex"]} flexWrap="wrap" gapsBoth="0.75rem">
                    {anime.themes
                        .filter((theme) => "entries" in theme && theme.entries.length && theme.entries[0].videos.length)
                        .sort(chain(themeTypeComparator, themeIndexComparator))
                        .slice(0, maxThemes)
                        .map((theme) => {
                            const entry = theme.entries[0];
                            const video = entry.videos[0];
                            const videoSlug = createVideoSlug(theme, entry, video);

                            return (
                                <Link key={theme.slug} href={`/anime/${anime.slug}/${videoSlug}`} passHref>
                                    <Button as="a" variant="on-card">
                                        <Button as="span" variant="primary">
                                            <Icon icon={faPlay}/>
                                        </Button>
                                        {theme.slug}
                                    </Button>
                                </Link>
                            );
                        })
                    }
                    {anime.themes.length > 4 && (
                        <Link href={animeLink} passHref>
                            <Button as="a" variant="on-card" title="Show all themes">
                                <Icon icon={faEllipsisH}/>
                            </Button>
                        </Link>
                    )}
                </Flex>
            )}
        </SummaryCard>
    );
}
