import { Fragment, useState } from "react";
import event from "lib/server/animeawards/index.json";
import { fetchData } from "lib/server";
import { SEO } from "components/seo";
import { Text } from "components/text";
import { Box, Flex, Grid } from "components/box";
import { SummaryCard } from "components/card";
import { Switcher } from "components/switcher";
import styled from "styled-components";
import theme from "theme";
import useImage from "hooks/useImage";
import createVideoSlug from "utils/createVideoSlug";
import Link from "next/link";
import { SongTitleWithArtists } from "components/utils";
import { Icon } from "components/icon";
import { faAward, faHashtag, faUsers } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const CornerIcon = styled(Icon).attrs({
    size: "2x"
})`
    position: absolute;
    right: 0;
    top: 0;
    color: ${theme.colors["text-primary"]};
    transform: translate(50%, -33%) rotate(10deg);
`;

const MotionThemeSummaryCard = motion(ThemeSummaryCard);

export default function AnimeAwardsPage({ awards }) {
    const [ judgeFilter, setJudgeFilter ] = useState("public");
    const [ typeFilter, setTypeFilter ] = useState(null);

    const sortFn = judgeFilter === "public"
        ? (a, b) => b.votesPublic - a.votesPublic
        : (a, b) => a.rankJury - b.rankJury;

    return (
        <Box gapsColumn="1.5rem">
            <SEO title="/r/anime Awards" description="Listen to all themes nominated for the /r/anime Awards."/>
            <Text variant="h1">/r/anime Awards</Text>
            {awards.map((award) => (
                <Fragment key={award.year}>
                    <Flex flexDirection={[ "column", "row" ]} alignItems={[ "stretch", "center" ]} justifyContent="space-between" gap="1rem">
                        <Text variant="h2">{award.year} Results</Text>
                        <Flex justifyContent="space-between" gap="1rem">
                            <Switcher
                                items={[ "public", "jury" ]}
                                selectedItem={judgeFilter}
                                onChange={setJudgeFilter}
                            />
                            <Switcher
                                items={[ null, "op", "ed" ]}
                                selectedItem={typeFilter}
                                onChange={setTypeFilter}
                            />
                        </Flex>
                    </Flex>
                    <Grid
                        gridTemplateColumns={[ "1fr", typeFilter ? "1fr" : "1fr 1fr" ]}
                        gridTemplateRows={[ typeFilter ? "repeat(10, auto)" : "repeat(20, auto)", "repeat(10, auto)" ]}
                        gridAutoFlow="column"
                        gridGap="1rem 2rem"
                    >
                        {(typeFilter === null || typeFilter === "op") && (
                            [...award.nominees.openings].sort(sortFn).map((nominee, rank) => (
                                <MotionThemeSummaryCard
                                    layout="position"
                                    theme={nominee.theme}
                                    key={nominee.theme.anime.slug + nominee.theme.slug + nominee.theme.group}
                                    rank={judgeFilter === "public" ? rank + 1 : nominee.rankJury}
                                    votes={judgeFilter === "public" && nominee.votesPublic}
                                />
                            ))
                        )}
                        {(typeFilter === null || typeFilter === "ed") && (
                            [...award.nominees.endings].sort(sortFn).map((nominee, rank) => (
                                <MotionThemeSummaryCard
                                    layout="position"
                                    theme={nominee.theme}
                                    key={nominee.theme.anime.slug + nominee.theme.slug + nominee.theme.group}
                                    rank={judgeFilter === "public" ? rank + 1 : nominee.rankJury}
                                    votes={judgeFilter === "public" && nominee.votesPublic}
                                />
                            ))
                        )}
                    </Grid>
                </Fragment>
            ))}

        </Box>
    );
}

function ThemeSummaryCard({ theme, rank, votes, ...props }) {
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
    const to = `/anime/${theme.anime.slug}/${videoSlug}`;

    const description = (
        <SummaryCard.Description>
            <span>{theme.slug}</span>
            <Link href={`/anime/${theme.anime.slug}`} passHref>
                <Text as="a" link>{theme.anime.name}</Text>
            </Link>
        </SummaryCard.Description>
    );

    return (
        <SummaryCard
            title={<SongTitleWithArtists song={theme.song} songTitleLinkTo={to}/>}
            description={description}
            image={smallCover}
            to={to}
            position="relative"
            pr="1.5rem"
            {...props}
        >
            <Flex flexDirection="column" gapsColumn="0.5rem" width="3rem">
                <Text variant="small" color="text-muted" noWrap title="Jury Rank">
                    <Icon icon={faHashtag}/>
                    <Text tabularNums letterSpacing="1px"> {rank}</Text>
                </Text>
                {!!votes && (
                    <Text variant="small" color="text-muted" noWrap title="Public Votes">
                        <Icon icon={faUsers}/>
                        <Text tabularNums letterSpacing="1px"> {votes}</Text>
                    </Text>
                )}
            </Flex>
            {rank === 1 && (
                <Box position="absolute" right="0" top="0">
                    <CornerIcon icon={faAward} title="Winner"/>
                </Box>
            )}
        </SummaryCard>
    );
}

export async function getStaticProps() {
    const awards = await Promise.all(event.map(async (award) => {
        const { openings, endings } = award.nominees;

        return {
            year: award.year,
            nominees: {
                openings: await Promise.all(openings.map(async (nominee) => ({
                    ...nominee,
                    theme: await fetchTheme(nominee.id)
                }))),
                endings: await Promise.all(endings.map(async (nominee) => ({
                    ...nominee,
                    theme: await fetchTheme(nominee.id)
                })))
            }
        };
    }));

    return {
        props: {
            awards
        }
    };
}

async function fetchTheme(opening) {
    const { data } = await fetchData(`
        #graphql

        query ($id: Int) {
            theme(id: $id) {
                id
                slug
                anime {
                    slug
                    name
                    images {
                        facet
                        link
                    }
                }
                song {
                    title
                    performances {
                        artist {
                            slug
                            name
                        }
                        as
                    }
                }
                entries {
                    version
                    videos {
                        basename
                        tags
                    }
                }
            }
        }
    `, { id: opening });

    return data.theme;
}
