import { ComponentPropsWithoutRef, Fragment, useState } from "react";
import event from "lib/server/animeawards/index.json";
import { fetchData } from "lib/server";
import { SEO } from "components/seo";
import { Text } from "components/text";
import { SummaryCard } from "components/card";
import { Switcher } from "components/switcher";
import styled from "styled-components";
import theme from "theme";
import extractImages from "utils/extractImages";
import createVideoSlug from "utils/createVideoSlug";
import Link from "next/link";
import { SongTitleWithArtists } from "components/utils";
import { Icon } from "components/icon";
import { faAward, faHashtag, faUsers } from "@fortawesome/pro-solid-svg-icons";
import { motion } from "framer-motion";
import getSharedPageProps from "utils/getSharedPageProps";
import { GetStaticProps } from "next";
import gql from "graphql-tag";
import { AwardPageThemeQuery } from "generated/graphql";
import { Comparator } from "utils/types";
import { SwitcherOption, SwitcherReset } from "components/switcher/Switcher";
import { CornerIcon } from "components/icon/CornerIcon";

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

const StyledNomineeGrid = styled.div<{ style: { "--columns": number, "--rows": number } }>`
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

interface AnimeAwardsPage {
    awards: Array<AwardWithThemes>
}

interface Award {
    year: number
    nominees: {
        openings: Array<Nominee>
        endings: Array<Nominee>
    }
}

interface AwardWithThemes extends Award {
    nominees: {
        openings: Array<Nominee & AwardPageThemeQuery>
        endings: Array<Nominee & AwardPageThemeQuery>
    }
}

interface Nominee {
    id: number
    votesPublic: number
    rankJury: number
}

export default function AnimeAwardsPage({ awards }: AnimeAwardsPage) {
    const [ judgeFilter, setJudgeFilter ] = useState("public");
    const [ typeFilter, setTypeFilter ] = useState<string | null>(null);

    const sortFn: Comparator<Nominee> = judgeFilter === "public"
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
                                <SwitcherOption value="public">Public</SwitcherOption>
                                <SwitcherOption value="jury">Jury</SwitcherOption>
                            </Switcher>
                            <Switcher selectedItem={typeFilter} onChange={setTypeFilter}>
                                <SwitcherReset/>
                                <SwitcherOption value="op">OP</SwitcherOption>
                                <SwitcherOption value="ed">ED</SwitcherOption>
                            </Switcher>
                        </StyledSwitchers>
                    </StyledHeader>
                    <StyledNomineeGrid style={{ "--columns": typeFilter ? 1 : 2, "--rows": typeFilter ? 10 : 20 }}>
                        {(typeFilter === null || typeFilter === "op") && (
                            [...award.nominees.openings].sort(sortFn).map((nominee, rank) => (
                                <motion.div
                                    layout="position"
                                    layoutId={String(nominee.id)}
                                    layoutDependency={judgeFilter}
                                    key={nominee.id}
                                >
                                    <AwardThemeSummaryCard
                                        theme={nominee.theme}
                                        rank={judgeFilter === "public" ? rank + 1 : nominee.rankJury}
                                        votes={judgeFilter === "public" ? nominee.votesPublic : null}
                                    />
                                </motion.div>
                            ))
                        )}
                        {(typeFilter === null || typeFilter === "ed") && (
                            [...award.nominees.endings].sort(sortFn).map((nominee, rank) => (
                                <motion.div
                                    layout="position"
                                    layoutId={String(nominee.id)}
                                    layoutDependency={judgeFilter}
                                    key={nominee.id}
                                >
                                    <AwardThemeSummaryCard
                                        theme={nominee.theme}
                                        rank={judgeFilter === "public" ? rank + 1 : nominee.rankJury}
                                        votes={judgeFilter === "public" ? nominee.votesPublic : null}
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

const StyledSummaryCardWrapper = styled.div`
    position: relative;
`;

const StyledSummaryCard = styled(SummaryCard)`
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

interface AwardThemeSummaryCardProps extends AwardPageThemeQuery, ComponentPropsWithoutRef<typeof StyledSummaryCardWrapper> {
    rank: number
    votes: number | null
}

function AwardThemeSummaryCard({ theme, rank, votes, ...props }: AwardThemeSummaryCardProps) {
    if (!theme?.anime) {
        return null;
    }

    const { smallCover } = extractImages(theme.anime);

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
            <Link
                href={`/anime/${theme.anime.slug}`}
                passHref
                legacyBehavior>
                <Text as="a" link>{theme.anime.name}</Text>
            </Link>
        </SummaryCard.Description>
    );

    return (
        <StyledSummaryCardWrapper {...props}>
            <StyledSummaryCard
                title={<SongTitleWithArtists song={theme.song} songTitleLinkTo={to}/>}
                description={description}
                image={smallCover}
                to={to}
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
            </StyledSummaryCard>
            {rank === 1 && (
                <CornerIcon icon={faAward} title="Winner"/>
            )}
        </StyledSummaryCardWrapper>
    );
}

export const getStaticProps: GetStaticProps<AnimeAwardsPage> = async () => {
    let totalApiRequests = 0;

    const awards = await Promise.all((event as Array<Award>).map(async (award) => {
        const { openings, endings } = award.nominees;

        async function populateNominees(nominees: Array<Nominee>) {
            return Promise.all(nominees.map(async (nominee) => {
                const { theme, apiRequests } = await fetchTheme(nominee.id);

                totalApiRequests += apiRequests;

                return { ...nominee, theme };
            }));
        }

        return {
            year: award.year,
            nominees: {
                openings: await populateNominees(openings),
                endings: await populateNominees(endings)
            }
        };
    }));

    return {
        props: {
            ...getSharedPageProps(totalApiRequests),
            awards
        }
    };
};

async function fetchTheme(themeId: number) {
    const { data, apiRequests } = await fetchData<AwardPageThemeQuery>(gql`
        query AwardPageTheme($themeId: Int) {
            theme(id: $themeId) {
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
    `, { themeId });

    return { theme: data.theme, apiRequests };
}
