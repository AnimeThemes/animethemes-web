import { useState } from "react";
import type { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";
import type { GetStaticProps } from "next";
import Link from "next/link";

import { faAward, faHashtag, faUsers } from "@fortawesome/pro-solid-svg-icons";
import { m } from "framer-motion";
import gql from "graphql-tag";

import { SummaryCard } from "@/components/card/SummaryCard";
import { CornerIcon } from "@/components/icon/CornerIcon";
import { Icon } from "@/components/icon/Icon";
import { SEO } from "@/components/seo/SEO";
import { Switcher } from "@/components/switcher/Switcher";
import { SwitcherOption, SwitcherReset } from "@/components/switcher/Switcher";
import { Text } from "@/components/text/Text";
import { SongTitleWithArtists } from "@/components/utils/SongTitleWithArtists";
import type { AwardPageThemeQuery } from "@/generated/graphql";
import { fetchData } from "@/lib/server";
import event from "@/lib/server/animeawards/index.json";
import theme from "@/theme";
import createVideoSlug from "@/utils/createVideoSlug";
import extractImages from "@/utils/extractImages";
import getSharedPageProps from "@/utils/getSharedPageProps";
import type { Comparator } from "@/utils/types";

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
    awards: Array<Award>
}

type Award = AwardUnvoted | AwardVoted;

interface AwardBase {
    year: number
}

interface AwardUnvoted extends AwardBase {
    isFinished: false
    nominees: {
        openings: Array<Nominee>
        endings: Array<Nominee>
    }
}

interface AwardVoted extends AwardBase {
    isFinished: true
    nominees: {
        openings: Array<NomineeVoted>
        endings: Array<NomineeVoted>
    }
}

interface Nominee extends AwardPageThemeQuery {
    id: number
    version?: number
}

interface NomineeVoted extends Nominee {
    votesPublic: number
    rankJury: number
}

export default function AnimeAwardsPage({ awards }: AnimeAwardsPage) {
    return (
        <>
            <SEO title="/r/anime Awards" description="Listen to all themes nominated for the /r/anime Awards."/>
            <Text variant="h1">/r/anime Awards</Text>
            {awards.map((award) => award.isFinished ? (
                <AwardSectionVoted key={award.year} award={award} />
            ) : (
                <AwardSectionUnvoted key={award.year} award={award} />
            ))}
        </>
    );
}

interface AwardSectionUnvotedProps {
    award: AwardUnvoted
}

function AwardSectionUnvoted({ award }: AwardSectionUnvotedProps) {
    const [ typeFilter, setTypeFilter ] = useState<string | null>(null);

    const sortFn: Comparator<Nominee> =  (a, b) => {
        const nameA = a.theme?.anime?.name;
        const nameB = b.theme?.anime?.name;

        return (nameA && nameB && nameA.localeCompare(nameB)) || 0;
    };

    return (
        <>
            <StyledHeader>
                <Text variant="h2">{award.year} Nominees</Text>
                <StyledSwitchers>
                    <Switcher selectedItem={typeFilter} onChange={setTypeFilter}>
                        <SwitcherReset/>
                        <SwitcherOption value="op">OP</SwitcherOption>
                        <SwitcherOption value="ed">ED</SwitcherOption>
                    </Switcher>
                </StyledSwitchers>
            </StyledHeader>
            <StyledNomineeGrid style={{ "--columns": typeFilter ? 1 : 2, "--rows": typeFilter ? 10 : 20 }}>
                {(typeFilter === null || typeFilter === "op") && (
                    [...award.nominees.openings].sort(sortFn).map((nominee) => (
                        <AwardThemeSummaryCard
                            key={nominee.id}
                            theme={nominee.theme}
                        />
                    ))
                )}
                {(typeFilter === null || typeFilter === "ed") && (
                    [...award.nominees.endings].sort(sortFn).map((nominee) => (
                        <AwardThemeSummaryCard
                            key={nominee.id}
                            theme={nominee.theme}
                        />
                    ))
                )}
            </StyledNomineeGrid>
        </>
    );
}

interface AwardSectionVotedProps {
    award: AwardVoted
}

function AwardSectionVoted({ award }: AwardSectionVotedProps) {
    const [ judgeFilter, setJudgeFilter ] = useState("public");
    const [ typeFilter, setTypeFilter ] = useState<string | null>(null);

    const sortFn = judgeFilter === "public"
        ? (a: NomineeVoted, b: NomineeVoted) => b.votesPublic - a.votesPublic
        : (a: NomineeVoted, b: NomineeVoted) => a.rankJury - b.rankJury;

    return (
        <>
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
                        <m.div
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
                        </m.div>
                    ))
                )}
                {(typeFilter === null || typeFilter === "ed") && (
                    [...award.nominees.endings].sort(sortFn).map((nominee, rank) => (
                        <m.div
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
                        </m.div>
                    ))
                )}
            </StyledNomineeGrid>
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
    rank?: number
    votes?: number | null
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
            <span>{theme.type + (theme.sequence || "")}{(entry.version && entry.version > 1) ? `v${entry.version}` : null}</span>
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
                {(rank || votes) ? (
                    <StyledRankInfo>
                        {rank ? (
                            <Text variant="small" color="text-muted" noWrap title="Jury Rank">
                                <Icon icon={faHashtag}/>
                                <StyledRank> {rank}</StyledRank>
                            </Text>
                        ) : null}
                        {votes ? (
                            <Text variant="small" color="text-muted" noWrap title="Public Votes">
                                <Icon icon={faUsers}/>
                                <StyledRank> {votes}</StyledRank>
                            </Text>
                        ) : null}
                    </StyledRankInfo>
                ) : null}
            </StyledSummaryCard>
            {rank === 1 && (
                <CornerIcon icon={faAward} title="Winner"/>
            )}
        </StyledSummaryCardWrapper>
    );
}

export const getStaticProps: GetStaticProps<AnimeAwardsPage> = async () => {
    let totalApiRequests = 0;

    const awards = await Promise.all((event as Array<Award>).map<Promise<Award>>(async (award) => {
        async function populateNominees<T extends Nominee>(nominees: Array<T>): Promise<Array<T>> {
            return Promise.all(nominees.map(async (nominee) => {
                const { theme, apiRequests } = await fetchTheme(nominee.id, nominee.version);

                totalApiRequests += apiRequests;

                return { ...nominee, theme };
            }));
        }

        if (award.isFinished) {
            return {
                ...award,
                isFinished: true,
                nominees: {
                    openings: await populateNominees(award.nominees.openings),
                    endings: await populateNominees(award.nominees.endings),
                },
            };
        }

        return {
            ...award,
            isFinished: false,
            nominees: {
                openings: await populateNominees(award.nominees.openings),
                endings: await populateNominees(award.nominees.endings),
            },
        };
    }));

    return {
        props: {
            ...getSharedPageProps(totalApiRequests),
            awards
        }
    };
};

async function fetchTheme(themeId: number, version?: number) {
    const { data, apiRequests } = await fetchData<AwardPageThemeQuery>(gql`
        ${createVideoSlug.fragments.theme}
        ${createVideoSlug.fragments.entry}
        ${createVideoSlug.fragments.video}
        
        query AwardPageTheme($themeId: Int) {
            theme(id: $themeId) {
                ...createVideoSlugTheme
                id
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
                    ...createVideoSlugEntry
                    version
                    videos {
                        ...createVideoSlugVideo
                        basename
                        tags
                    }
                }
            }
        }
    `, { themeId });

    return { theme: {
        ...data.theme,
        entries: version ? data.theme?.entries.filter((e) => e.version === version) : data.theme?.entries.slice(0, 1)
    }, apiRequests };
}