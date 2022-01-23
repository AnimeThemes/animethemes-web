import Link from "next/link";
import { faChevronDown, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Button } from "components/button";
import { Text } from "components/text";
import useImage from "hooks/useImage";
import createVideoSlug from "utils/createVideoSlug";
import { Flex } from "components/box";
import { Icon } from "components/icon";
import { SummaryCard } from "components/card";
import { chain, themeIndexComparator, themeTypeComparator } from "utils/comparators";
import styled from "styled-components";
import useToggle from "hooks/useToggle";
import { motion } from "framer-motion";

const StyledThemeContainer = styled(motion.div)`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    margin-top: -1rem;
    padding: 2rem 0 0;
    border-radius: 1rem;
    user-select: none;
`;

export function AnimeSummaryCard({ anime, hideThemes = false, maxThemes = 2 }) {
    const { smallCover } = useImage(anime);
    const [ showAllThemes, toggleShowAllThemes ] = useToggle();

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
        <div>
            <SummaryCard
                title={anime.name}
                description={description}
                image={smallCover}
                to={animeLink}
            >
                {!hideThemes && (
                    <Flex display={["none", "flex"]} flexWrap="wrap" gapsBoth="0.75rem">
                        {!showAllThemes && (
                            <Themes anime={anime} maxThemes={maxThemes}/>
                        )}
                        {anime.themes.length > maxThemes && (
                            <Button as="a" variant="on-card" silent title="Show all themes" onClick={toggleShowAllThemes}>
                                <Icon icon={faChevronDown} rotation={showAllThemes ? 180 : 0} transition="transform 400ms"/>
                            </Button>
                        )}
                    </Flex>
                )}
            </SummaryCard>
            {showAllThemes && (
                <StyledThemeContainer variants={{
                    show: {
                        transition: {
                            staggerChildren: 0.04
                        }
                    }
                }} initial="hidden" animate="show" layoutDependency={showAllThemes}>
                    <Themes anime={anime}/>
                </StyledThemeContainer>
            )}
        </div>
    );
}

function Themes({ anime, maxThemes = false }) {
    return anime.themes
        .filter((theme) => "entries" in theme && theme.entries.length && theme.entries[0].videos.length)
        .sort(chain(themeTypeComparator, themeIndexComparator))
        .slice(0, maxThemes !== false ? maxThemes : anime.themes.length)
        .map((theme) => {
            const entry = theme.entries[0];
            const video = entry.videos[0];
            const videoSlug = createVideoSlug(theme, entry, video);

            return (
                <Link key={theme.slug} href={`/anime/${anime.slug}/${videoSlug}`} passHref>
                    <Button
                        as={motion.a}
                        variant="on-card"
                        layout="position"
                        layoutId={anime.slug + theme.slug}
                        layoutDependency={maxThemes}
                        variants={{
                            hidden: {
                                opacity: 0, y: -32
                            },
                            show: {
                                opacity: 1, y: 0
                            }
                        }}
                        transition={{ duration: 0.4 }}
                    >
                        <Button as="span" variant="primary">
                            <Icon icon={faPlay}/>
                        </Button>
                        {theme.slug}
                    </Button>
                </Link>
            );
        });
}
