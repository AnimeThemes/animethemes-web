import { Fragment, useState } from "react";
import event from "lib/server/animeawards/index.json";
import { fetchData } from "lib/server";
import { SEO } from "components/seo";
import { Text } from "components/text";
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

const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    
    @media (max-width: ${theme.breakpoints.mobileMax}) {
        flex-direction: column;
        align-items: stretch;
    }
`;

const StyledSwitchers = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 16px;
`;

const StyledNomineeGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
    grid-template-rows: repeat(10, auto);
    grid-auto-flow: column;
    grid-gap: 16px 32px;

    @media (max-width: ${theme.breakpoints.mobileMax}) {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(var(--rows), auto);
    }
`;

const CornerIcon = styled(Icon).attrs({
    size: "2x"
})`
    position: absolute;
    right: 0;
    top: 0;
    color: ${theme.colors["text-primary"]};
    transform: translate(50%, -33%) rotate(10deg);
`;

export default function AnimeAwardsPage({ awards }) {
    const [ judgeFilter, setJudgeFilter ] = useState("public");
    const [ typeFilter, setTypeFilter ] = useState(null);

    const sortFn = judgeFilter === "public"
        ? (a, b) => b.votesPublic - a.votesPublic
        : (a, b) => a.rankJury - b.rankJury;

    return (
        <>
            <SEO title="/r/anime Awards" description="Listen to all themes nominated for the /r/anime Awards."/>
            <Text variant="h1">/r/anime Awards</Text>
            {awards.map((award) => (
                <Fragment key={award.year}>
                    <StyledHeader>
                        <Text variant="h2">{award.year} Results</Text>
                        <StyledSwitchers>
                            <Switcher selectedItem={judgeFilter} onChange={setJudgeFilter}>
                                <Switcher.Option value="public">Public</Switcher.Option>
                                <Switcher.Option value="jury">Jury</Switcher.Option>
                            </Switcher>
                            <Switcher selectedItem={typeFilter} onChange={setTypeFilter}>
                                <Switcher.Reset/>
                                <Switcher.Option value="op">OP</Switcher.Option>
                                <Switcher.Option value="ed">ED</Switcher.Option>
                            </Switcher>
                        </StyledSwitchers>
                    </StyledHeader>
                    <StyledNomineeGrid style={{ "--columns": typeFilter ? 1 : 2, "--rows": typeFilter ? 10 : 20 }}>
                        {(typeFilter === null || typeFilter === "op") && (
                            [...award.nominees.openings].sort(sortFn).map((nominee, rank) => (
                                <motion.div
                                    layout="position"
                                    layoutId={nominee.theme.anime.slug + nominee.theme.slug + nominee.theme.group}
                                    layoutDependency={judgeFilter}
                                    key={nominee.theme.anime.slug + nominee.theme.slug + nominee.theme.group}
                                >
                                    <ThemeSummaryCard
                                        theme={nominee.theme}
                                        rank={judgeFilter === "public" ? rank + 1 : nominee.rankJury}
                                        votes={judgeFilter === "public" && nominee.votesPublic}
                                    />
                                </motion.div>
                            ))
                        )}
                        {(typeFilter === null || typeFilter === "ed") && (
                            [...award.nominees.endings].sort(sortFn).map((nominee, rank) => (
                                <motion.div
                                    layout="position"
                                    layoutId={nominee.theme.anime.slug + nominee.theme.slug + nominee.theme.group}
                                    layoutDependency={judgeFilter}
                                    key={nominee.theme.anime.slug + nominee.theme.slug + nominee.theme.group}
                                >
                                    <ThemeSummaryCard
                                        theme={nominee.theme}
                                        rank={judgeFilter === "public" ? rank + 1 : nominee.rankJury}
                                        votes={judgeFilter === "public" && nominee.votesPublic}
                                    />
                                </motion.div>
                            ))
                        )}
                    </StyledNomineeGrid>
                </Fragment>
            ))}

        </>
    );
}

const StyledSummaryCard = styled(SummaryCard)`
    position: relative;
    
    width: 100%;
    padding-inline-end: 24px;
`;

const StyledRankInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 48px;
`;

const StyledRank = styled(Text)`
    font-variant-numeric: tabular-nums;
    letter-spacing: 1px;
`;

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
        <StyledSummaryCard
            title={<SongTitleWithArtists song={theme.song} songTitleLinkTo={to}/>}
            description={description}
            image={smallCover}
            to={to}
            {...props}
        >
            <StyledRankInfo>
                <Text variant="small" color="text-muted" noWrap title="Jury Rank">
                    <Icon icon={faHashtag}/>
                    <StyledRank> {rank}</StyledRank>
                </Text>
                {!!votes && (
                    <Text variant="small" color="text-muted" noWrap title="Public Votes">
                        <Icon icon={faUsers}/>
                        <StyledRank> {votes}</StyledRank>
                    </Text>
                )}
            </StyledRankInfo>
            {rank === 1 && (
                <CornerIcon icon={faAward} title="Winner"/>
            )}
        </StyledSummaryCard>
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
