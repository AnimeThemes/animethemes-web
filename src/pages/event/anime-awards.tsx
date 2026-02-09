import { useState } from "react";
import type { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";
import type { GetStaticProps } from "next";
import Link from "next/link";

import { faAward, faHashtag, faUsers } from "@fortawesome/free-solid-svg-icons";
import { m } from "motion/react";

import { SummaryCard } from "@/components/card/SummaryCard";
import { CornerIcon } from "@/components/icon/CornerIcon";
import { Icon } from "@/components/icon/Icon";
import { SEO } from "@/components/seo/SEO";
import { Switcher, SwitcherOption, SwitcherReset } from "@/components/switcher/Switcher";
import { Text } from "@/components/text/Text";
import { SongTitleWithArtists } from "@/components/utils/SongTitleWithArtists";
import createApolloClient from "@/graphql/createApolloClient";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";
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

const StyledNomineeGrid = styled.div<{ style: { "--columns": number; "--rows": number } }>`
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

const fragments = {
    theme: graphql(`
        fragment AnimeAwardsPageTheme on AnimeTheme {
            ...createVideoSlugTheme
            id
            type
            sequence
            anime {
                slug
                name
                images {
                    nodes {
                        ...extractImagesImage
                    }
                }
            }
            song {
                ...SongTitleWithArtistsSong
            }
        }
    `),
    entry: graphql(`
        fragment AnimeAwardPageEntry on AnimeThemeEntry {
            ...createVideoSlugEntry
            version
            videos {
                nodes {
                    ...createVideoSlugVideo
                    basename
                    tags
                }
            }
        }
    `),
};

interface Nominee {
    id: number;
    version?: number;
}

interface HasVotes {
    votesPublic: number;
    rankJury: number;
}

interface HasTheme {
    theme: FragmentType<typeof fragments.theme>;
    entry: FragmentType<typeof fragments.entry>;
}

type Award = AwardUnvoted | AwardVoted;

interface AwardBase {
    year: number;
}

interface AwardUnvoted extends AwardBase {
    isFinished: false;
    nominees: {
        openings: Array<Nominee>;
        endings: Array<Nominee>;
    };
}

interface AwardVoted extends AwardBase {
    isFinished: true;
    nominees: {
        openings: Array<Nominee & HasVotes>;
        endings: Array<Nominee & HasVotes>;
    };
}

type AwardPopulated = AwardUnvotedPopulated | AwardVotedPopulated;

interface AwardUnvotedPopulated extends AwardUnvoted {
    nominees: {
        openings: Array<Nominee & HasTheme>;
        endings: Array<Nominee & HasTheme>;
    };
}

interface AwardVotedPopulated extends AwardVoted {
    nominees: {
        openings: Array<Nominee & HasVotes & HasTheme>;
        endings: Array<Nominee & HasVotes & HasTheme>;
    };
}

interface AnimeAwardsPage {
    awards: Array<AwardPopulated>;
}

export default function AnimeAwardsPage({ awards }: AnimeAwardsPage) {
    return (
        <>
            <SEO title="/r/anime Awards" description="Listen to all themes nominated for the /r/anime Awards." />
            <Text variant="h1">/r/anime Awards</Text>
            {awards.map((award) =>
                award.isFinished ? (
                    <AwardSectionVoted key={award.year} award={award} />
                ) : (
                    <AwardSectionUnvoted key={award.year} award={award} />
                ),
            )}
        </>
    );
}

interface AwardSectionUnvotedProps {
    award: AwardUnvotedPopulated;
}

function AwardSectionUnvoted({ award }: AwardSectionUnvotedProps) {
    const [typeFilter, setTypeFilter] = useState<string | null>(null);

    const sortFn: Comparator<HasTheme> = (a, b) => {
        const nameA = getFragmentData(fragments.theme, a.theme)?.anime?.name;
        const nameB = getFragmentData(fragments.theme, b.theme)?.anime?.name;

        return (nameA && nameB && nameA.localeCompare(nameB)) || 0;
    };

    return (
        <>
            <StyledHeader>
                <Text variant="h2">{award.year} Nominees</Text>
                <StyledSwitchers>
                    <Switcher selectedItem={typeFilter} onChange={setTypeFilter}>
                        <SwitcherReset />
                        <SwitcherOption value="op">OP</SwitcherOption>
                        <SwitcherOption value="ed">ED</SwitcherOption>
                    </Switcher>
                </StyledSwitchers>
            </StyledHeader>
            <StyledNomineeGrid style={{ "--columns": typeFilter ? 1 : 2, "--rows": typeFilter ? 10 : 20 }}>
                {(typeFilter === null || typeFilter === "op") &&
                    [...award.nominees.openings]
                        .sort(sortFn)
                        .map((nominee) => (
                            <AwardThemeSummaryCard key={nominee.id} theme={nominee.theme} entry={nominee.entry} />
                        ))}
                {(typeFilter === null || typeFilter === "ed") &&
                    [...award.nominees.endings]
                        .sort(sortFn)
                        .map((nominee) => (
                            <AwardThemeSummaryCard key={nominee.id} theme={nominee.theme} entry={nominee.entry} />
                        ))}
            </StyledNomineeGrid>
        </>
    );
}

interface AwardSectionVotedProps {
    award: AwardVotedPopulated;
}

function AwardSectionVoted({ award }: AwardSectionVotedProps) {
    const [judgeFilter, setJudgeFilter] = useState("public");
    const [typeFilter, setTypeFilter] = useState<string | null>(null);

    const sortFn =
        judgeFilter === "public"
            ? (a: HasVotes, b: HasVotes) => b.votesPublic - a.votesPublic
            : (a: HasVotes, b: HasVotes) => a.rankJury - b.rankJury;

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
                        <SwitcherReset />
                        <SwitcherOption value="op">OP</SwitcherOption>
                        <SwitcherOption value="ed">ED</SwitcherOption>
                    </Switcher>
                </StyledSwitchers>
            </StyledHeader>
            <StyledNomineeGrid style={{ "--columns": typeFilter ? 1 : 2, "--rows": typeFilter ? 10 : 20 }}>
                {(typeFilter === null || typeFilter === "op") &&
                    [...award.nominees.openings].sort(sortFn).map((nominee, rank) => (
                        <m.div
                            layout="position"
                            layoutId={String(nominee.id)}
                            layoutDependency={judgeFilter}
                            key={nominee.id}
                        >
                            <AwardThemeSummaryCard
                                theme={nominee.theme}
                                entry={nominee.entry}
                                rank={judgeFilter === "public" ? rank + 1 : nominee.rankJury}
                                votes={judgeFilter === "public" ? nominee.votesPublic : null}
                            />
                        </m.div>
                    ))}
                {(typeFilter === null || typeFilter === "ed") &&
                    [...award.nominees.endings].sort(sortFn).map((nominee, rank) => (
                        <m.div
                            layout="position"
                            layoutId={String(nominee.id)}
                            layoutDependency={judgeFilter}
                            key={nominee.id}
                        >
                            <AwardThemeSummaryCard
                                theme={nominee.theme}
                                entry={nominee.entry}
                                rank={judgeFilter === "public" ? rank + 1 : nominee.rankJury}
                                votes={judgeFilter === "public" ? nominee.votesPublic : null}
                            />
                        </m.div>
                    ))}
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

interface AwardThemeSummaryCardProps extends ComponentPropsWithoutRef<typeof StyledSummaryCardWrapper> {
    theme: FragmentType<typeof fragments.theme>;
    entry: FragmentType<typeof fragments.entry>;
    rank?: number;
    votes?: number | null;
}

function AwardThemeSummaryCard({
    theme: themeFragment,
    entry: entryFragment,
    rank,
    votes,
    ...props
}: AwardThemeSummaryCardProps) {
    const theme = getFragmentData(fragments.theme, themeFragment);
    const entry = getFragmentData(fragments.entry, entryFragment);

    if (!theme?.anime) {
        return null;
    }

    const { smallCover } = extractImages(theme.anime.images.nodes);

    if (!entry.videos.nodes.length) {
        return null;
    }

    const video = entry.videos.nodes[0];
    const videoSlug = createVideoSlug(theme, entry, video);
    const to = `/anime/${theme.anime.slug}/${videoSlug}`;

    const description = (
        <SummaryCard.Description>
            <span>
                {theme.type + (theme.sequence || "")}
                {entry.version && entry.version > 1 ? `v${entry.version}` : null}
            </span>
            <Text as={Link} href={`/anime/${theme.anime.slug}`} link>
                {theme.anime.name}
            </Text>
        </SummaryCard.Description>
    );

    return (
        <StyledSummaryCardWrapper {...props}>
            <StyledSummaryCard
                title={<SongTitleWithArtists song={theme.song} songTitleLinkTo={to} />}
                description={description}
                image={smallCover}
                to={to}
            >
                {rank || votes ? (
                    <StyledRankInfo>
                        {rank ? (
                            <Text variant="small" color="text-muted" noWrap title="Jury Rank">
                                <Icon icon={faHashtag} />
                                <StyledRank> {rank}</StyledRank>
                            </Text>
                        ) : null}
                        {votes ? (
                            <Text variant="small" color="text-muted" noWrap title="Public Votes">
                                <Icon icon={faUsers} />
                                <StyledRank> {votes}</StyledRank>
                            </Text>
                        ) : null}
                    </StyledRankInfo>
                ) : null}
            </StyledSummaryCard>
            {rank === 1 && <CornerIcon icon={faAward} title="Winner" />}
        </StyledSummaryCardWrapper>
    );
}

export const getStaticProps: GetStaticProps<AnimeAwardsPage> = async () => {
    const client = createApolloClient();

    const themeIds = new Set(
        event.flatMap((award) => [...award.nominees.openings, ...award.nominees.endings]).map((nominee) => nominee.id),
    );

    const { data } = await client.query({
        query: graphql(`
            query AnimeAwardPage($themeIds: [Int!]!) {
                animethemePagination(id_in: $themeIds) {
                    data {
                        ...AnimeAwardsPageTheme
                        id
                        animethemeentries {
                            ...AnimeAwardPageEntry
                            version
                        }
                    }
                }
            }
        `),
        variables: {
            themeIds: [...themeIds],
        },
    });

    const themesById = new Map(data.animethemePagination.data.map((theme) => [theme.id, theme]));

    const awards = (event as Array<Award>).map<AwardPopulated>((award) => {
        function populateNominees<T extends Nominee>(nominees: Array<T>): Array<T & HasTheme> {
            return nominees.flatMap((nominee) => {
                const theme = themesById.get(nominee.id);

                if (!theme) {
                    return [];
                }

                return [
                    {
                        ...nominee,
                        theme,
                        entry:
                            (nominee.version !== undefined
                                ? theme?.animethemeentries.find((entry) => entry.version === nominee.version)
                                : null) ?? theme?.animethemeentries[0],
                    },
                ];
            });
        }

        if (award.isFinished) {
            return {
                ...award,
                isFinished: true,
                nominees: {
                    openings: populateNominees(award.nominees.openings),
                    endings: populateNominees(award.nominees.endings),
                },
            };
        }

        return {
            ...award,
            isFinished: false,
            nominees: {
                openings: populateNominees(award.nominees.openings),
                endings: populateNominees(award.nominees.endings),
            },
        };
    });

    return {
        props: {
            ...getSharedPageProps(),
            awards,
        },
    };
};
