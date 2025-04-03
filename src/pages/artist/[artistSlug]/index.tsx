import React, { useCallback } from "react";
import { memo, useMemo, useState } from "react";
import { useContext } from "react";
import styled from "styled-components";
import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

import gql from "graphql-tag";
import { uniq } from "lodash-es";
import type { ParsedUrlQuery } from "querystring";

import { Column } from "@/components/box/Flex";
import { FilterToggleButton } from "@/components/button/FilterToggleButton";
import { Card } from "@/components/card/Card";
import { ThemeSummaryCard } from "@/components/card/ThemeSummaryCard";
import { SidebarContainer } from "@/components/container/SidebarContainer";
import { DescriptionList } from "@/components/description-list/DescriptionList";
import { ExternalLink } from "@/components/external-link/ExternalLink";
import { MultiLargeCoverImage } from "@/components/image/MultiCoverImage";
import { Listbox, ListboxOption } from "@/components/listbox/Listbox";
import { SearchFilter } from "@/components/search-filter/SearchFilter";
import { SearchFilterGroup } from "@/components/search-filter/SearchFilterGroup";
import { SearchFilterSortBy } from "@/components/search-filter/SearchFilterSortBy";
import { SEO } from "@/components/seo/SEO";
import { Text } from "@/components/text/Text";
import { Collapse } from "@/components/utils/Collapse";
import PlayerContext, { createWatchListItem } from "@/context/playerContext";
import type {
    ArtistDetailPageAllQuery,
    ArtistDetailPageQuery,
    ArtistDetailPageQueryVariables,
    ThemeSummaryCardArtistFragment,
} from "@/generated/graphql";
import useToggle from "@/hooks/useToggle";
import { fetchData } from "@/lib/server";
import {
    either,
    getComparator,
    resourceAsComparator,
    resourceSiteComparator,
    SONG_A_Z,
    SONG_A_Z_ANIME,
    SONG_NEW_OLD,
    SONG_OLD_NEW,
    SONG_Z_A,
    SONG_Z_A_ANIME,
} from "@/utils/comparators";
import fetchStaticPaths from "@/utils/fetchStaticPaths";
import getSharedPageProps from "@/utils/getSharedPageProps";
import { HeightTransition } from "@/components/utils/HeightTransition";
import type { RequiredNonNullable } from "@/utils/types";

const StyledList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    text-align: center;
`;

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

type Performance = ArtistDetailPageProps["artist"]["performances"][number];

function getPerformanceFilter(key: string | null): (performance: Performance) => boolean {
    switch (key) {
        case "SOLO":
            return (performance) => performance.song.performances.length === 1;
        case "GROUP":
            return (performance) => performance.song.performances.length > 1;
        default:
            return () => true;
    }
}

type ArtistDetailPageProps = RequiredNonNullable<ArtistDetailPageQuery>;

interface ArtistDetailPageParams extends ParsedUrlQuery {
    artistSlug: string;
}

export default function ArtistDetailPage({ artist }: ArtistDetailPageProps) {
    const [collapseInformation, setCollapseInformation] = useState(true);
   // const images = {name: artist.name, images: extractMultipleImages(artist)} as MultiCoverImageResourceWithImagesFragment;

    const characters = useMemo(
        () =>
            uniq([
                ...artist.performances.map((performance) => performance.as),
                ...artist.groups.map((group) => group.as),
            ]).filter((alias) => alias) as Array<string>,
        [artist.performances, artist.groups],
    );
    const aliases = useMemo(
        () =>
            uniq([
                ...artist.performances.map((performance) => performance.alias),
                ...artist.groups.map((group) => group.alias),
            ]).filter((alias) => alias) as Array<string>,
        [artist.performances, artist.groups],
    );

    const performedAsFilterOptions = useMemo(
        () => [null, artist.name, ...aliases, ...characters],
        [aliases, artist.name, characters],
    );

    const [showFilter, toggleShowFilter] = useToggle();
    const [filterPerformance, setFilterPerformance] = useState<string | null>(null);
    const [filterPerformedAs, setFilterPerformedAs] = useState(performedAsFilterOptions[0]);
    const [sortBy, setSortBy] = useState<
        | typeof SONG_A_Z_ANIME
        | typeof SONG_Z_A_ANIME
        | typeof SONG_A_Z
        | typeof SONG_Z_A
        | typeof SONG_OLD_NEW
        | typeof SONG_NEW_OLD
    >(SONG_A_Z_ANIME);

    const filterPerformances = useCallback(
        (
            performances: ArtistDetailPageProps["artist"]["performances"],
            groupAs: string | null,
            groupAlias: string | null,
        ) =>
            performances.filter(
                (performance) =>
                    performance.song?.themes[0]?.entries[0]?.videos[0] &&
                    (filterPerformedAs === null ||
                        (filterPerformedAs === artist.name &&
                            !performance.as &&
                            !groupAs &&
                            !performance.alias &&
                            !groupAlias) ||
                        filterPerformedAs === groupAs ||
                        filterPerformedAs === performance.as ||
                        filterPerformedAs === groupAlias ||
                        filterPerformedAs === performance.alias),
            ),
        [artist.name, filterPerformedAs],
    );

    const toSortedThemes = useCallback(
        (performances: ArtistDetailPageProps["artist"]["performances"]) =>
            performances.flatMap((performance) => performance.song.themes).sort(getComparator(sortBy)),
        [sortBy],
    );

    const performancesGroupedByAlias = useMemo(
        () =>
            filterPerformances(artist.performances.filter(getPerformanceFilter(filterPerformance)), null, null).reduce(
                (prev, curr) => {
                    const group = prev.get(curr.alias);
                    if (!group) {
                        prev.set(curr.alias, [curr]);
                    } else {
                        group.push(curr);
                    }
                    return prev;
                },
                new Map<string | null, ArtistDetailPageProps["artist"]["performances"]>(),
            ),
        [artist.performances, filterPerformance, filterPerformances],
    );
    const performancesAsSelf = useMemo(() => performancesGroupedByAlias.get(null) ?? [], [performancesGroupedByAlias]);

    const groups = useMemo(
        () =>
            artist.groups.map((group) => ({
                ...group,
                group: {
                    ...group.group,
                    performances:
                        filterPerformance === "SOLO"
                            ? []
                            : filterPerformances(group.group.performances, group.as, group.alias),
                },
            })),
        [artist.groups, filterPerformance, filterPerformances],
    );

    return (
        <>
            <SEO title={artist.name}/>
            <Text variant="h1">{artist.name}</Text>
            <SidebarContainer>
                <Column style={{ "--gap": "24px" }}>
                    <MultiLargeCoverImage resourceWithImages={artist}/>
                    <DescriptionList>
                        {aliases.length > 0 && (
                            <DescriptionList.Item title="Aliases">
                                <StyledList>
                                    {aliases.map((alias) => (
                                        <Text as="a" key={alias}>
                                            {alias}
                                        </Text>
                                    ))}
                                </StyledList>
                            </DescriptionList.Item>
                        )}
                        {!!artist.members?.length && (
                            <DescriptionList.Item title="Members">
                                <StyledList>
                                    {artist.members.map(({ member, alias, as, notes }) => (
                                        <Text key={member.slug} as={Link} href={`/artist/${member.slug}`} link>
                                            {alias ? alias : member.name}
                                            {as ? ` (as ${as})` : null}
                                            {notes ? ` (${notes})` : null}
                                        </Text>
                                    ))}
                                </StyledList>
                            </DescriptionList.Item>
                        )}
                        {!!artist.groups?.length && (
                            <DescriptionList.Item title="Member of">
                                <StyledList>
                                    {artist.groups.map(({ group, alias, as, notes }) => (
                                        <Text key={group.slug} as={Link} href={`/artist/${group.slug}`} link>
                                            {alias ? alias : group.name}
                                            {as ? ` (as ${as})` : null}
                                            {notes ? ` (${notes})` : null}
                                        </Text>
                                    ))}
                                </StyledList>
                            </DescriptionList.Item>
                        )}
                        {!!artist.resources && !!artist.resources.length && (
                            <DescriptionList.Item title="Links">
                                <StyledList>
                                    {artist.resources
                                        .sort(either(resourceSiteComparator).or(resourceAsComparator).chain())
                                        .map((resource) => (
                                            <ExternalLink key={resource.link} href={resource.link}>
                                                {resource.site}
                                                {!!resource.as && ` (${resource.as})`}
                                            </ExternalLink>
                                        ))}
                                </StyledList>
                            </DescriptionList.Item>
                        )}
                    </DescriptionList>
                </Column>
                <Column style={{ "--gap": "24px" }}>
                    {!!artist.information && (
                        <>
                            <Text variant="h2">Information</Text>
                            <Card $hoverable onClick={() => setCollapseInformation(!collapseInformation)}>
                                <HeightTransition>
                                    <Text
                                        as="p"
                                        maxLines={collapseInformation ? 2 : undefined}
                                        dangerouslySetInnerHTML={{ __html: artist.information }}
                                    />
                                </HeightTransition>
                            </Card>
                        </>
                    )}
                    <StyledHeader>
                        <Text variant="h2">
                            Song Performances
                            <Text color="text-disabled"> ({performancesAsSelf.length})</Text>
                        </Text>
                        <FilterToggleButton onClick={toggleShowFilter} />
                    </StyledHeader>
                    <Collapse collapse={!showFilter}>
                        <SearchFilterGroup>
                            <SearchFilter>
                                <Text variant="h2">Performed with</Text>
                                <Listbox
                                    value={filterPerformance}
                                    onValueChange={setFilterPerformance}
                                    defaultValue={null}
                                    nullable
                                    resettable
                                    highlightNonDefault
                                >
                                    <ListboxOption value={null} hidden>
                                        Any
                                    </ListboxOption>
                                    <ListboxOption value="SOLO">Solo</ListboxOption>
                                    <ListboxOption value="GROUP">Group</ListboxOption>
                                </Listbox>
                            </SearchFilter>
                            <SearchFilter>
                                <Text variant="h2">Performed as</Text>
                                <Listbox
                                    value={filterPerformedAs}
                                    onValueChange={setFilterPerformedAs}
                                    defaultValue={null}
                                    nullable
                                    resettable
                                    highlightNonDefault
                                >
                                    {performedAsFilterOptions.map((option) => (
                                        <ListboxOption key={option} value={option} hidden={!option}>
                                            {option ?? "Any"}
                                        </ListboxOption>
                                    ))}
                                </Listbox>
                            </SearchFilter>
                            <SearchFilterSortBy value={sortBy} setValue={setSortBy}>
                                <SearchFilterSortBy.Option value={SONG_A_Z_ANIME}>
                                    A ➜ Z (Anime)
                                </SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={SONG_Z_A_ANIME}>
                                    Z ➜ A (Anime)
                                </SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={SONG_A_Z}>A ➜ Z (Song)</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={SONG_Z_A}>Z ➜ A (Song)</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={SONG_OLD_NEW}>Old ➜ New</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={SONG_NEW_OLD}>New ➜ Old</SearchFilterSortBy.Option>
                            </SearchFilterSortBy>
                        </SearchFilterGroup>
                    </Collapse>
                    <Column style={{ "--gap": "48px" }}>
                        {performancesAsSelf.length ? (
                            <Column style={{ "--gap": "16px" }}>
                                <ArtistThemes themes={toSortedThemes(performancesAsSelf)} artist={artist} />
                            </Column>
                        ) : null}
                        {[...performancesGroupedByAlias.entries()]
                            .filter(([alias]) => alias !== null)
                            .map(([alias, performances]) => (
                                <Column key={alias} style={{ "--gap": "16px" }}>
                                    <Text variant="h2">
                                        {`As ${alias} `}
                                        <Text color="text-disabled"> ({performances.length})</Text>
                                    </Text>
                                    <ArtistThemes themes={toSortedThemes(performances)} artist={artist} />
                                </Column>
                            ))}
                        {groups.map((group) =>
                            group.group.performances.length ? (
                                <Column key={group.group.slug} style={{ "--gap": "16px" }}>
                                    <Text variant="h2">
                                        {group.alias ? `As ${group.alias} ` : null}
                                        {group.as ? `As ${group.as} ` : null}
                                        In{" "}
                                        <Link href={`/artist/${group.group.slug}`}>
                                            <Text link>{group.group.name}</Text>
                                        </Link>
                                        <Text color="text-disabled"> ({group.group.performances.length})</Text>
                                    </Text>
                                    <ArtistThemes
                                        themes={toSortedThemes(group.group.performances)}
                                        artist={group.group}
                                    />
                                </Column>
                            ) : null,
                        )}
                    </Column>
                </Column>
            </SidebarContainer>
        </>
    );
}

interface ArtistThemesProps {
    themes: Performance["song"]["themes"];
    artist: ThemeSummaryCardArtistFragment;
}

const ArtistThemes = memo(function ArtistThemes({ themes, artist }: ArtistThemesProps) {
    const { setWatchListFactory, setWatchList, setCurrentWatchListItem } = useContext(PlayerContext);

    function playArtistThemes(initiatingThemeIndex: number, entryIndex = 0, videoIndex = 0) {
        const watchList = themes.flatMap((theme, index) => {
            const entry = initiatingThemeIndex == index ? theme.entries[entryIndex] : theme.entries[0];
            const video = initiatingThemeIndex == index ? entry?.videos[videoIndex] : entry?.videos[0];

            if (!entry || !video) {
                return [];
            }

            return [createWatchListItem(video, { ...entry, theme })];
        });

        setWatchList(watchList);
        setWatchListFactory(null);
        setCurrentWatchListItem(watchList[initiatingThemeIndex]);
    }

    const themeCards = themes.map((theme, index) => (
        <ThemeSummaryCard
            key={`${theme.anime?.slug}-${theme.id}`}
            theme={theme}
            artist={artist}
            expandable
            onPlay={(entryIndex, videoIndex) => playArtistThemes(index, entryIndex, videoIndex)}
        />
    ));

    return <>{themeCards}</>;
});

ArtistDetailPage.fragements = {
    artist: gql`
        ${ThemeSummaryCard.fragments.theme}
        ${ThemeSummaryCard.fragments.artist}
        ${ThemeSummaryCard.fragments.expandable}

        fragment ArtistDetailPageArtist on Artist {
            ...ThemeSummaryCardArtist
            slug
            information
            name
            performances {
                alias
                as
                song {
                    id
                    title
                    performances {
                        artist {
                            slug
                            name
                        }
                        alias
                        as
                    }
                    themes {
                        ...ThemeSummaryCardTheme
                        ...ThemeSummaryCardThemeExpandable
                        id
                        group {
                            name
                            slug
                        }
                        anime {
                            slug
                            year
                            season
                        }
                    }
                }
            }
            members {
                member {
                    slug
                    name
                }
                alias
                as
                notes
            }
            groups {
                group {
                    slug
                    name
                    performances {
                        alias
                        as
                        song {
                            id
                            title
                            performances {
                                artist {
                                    slug
                                    name
                                }
                                alias
                                as
                            }
                            themes {
                                ...ThemeSummaryCardTheme
                                ...ThemeSummaryCardThemeExpandable
                                id
                                group {
                                    name
                                    slug
                                }
                                anime {
                                    slug
                                    year
                                    season
                                }
                            }
                        }
                    }
                }
                alias
                as
                notes
            }
            resources {
                link
                site
                as
            }
            images {
                depth
                facet
                link
            }
        }
    `,
};

const buildTimeCache: Map<string, ArtistDetailPageQuery> = new Map();

export const getStaticProps: GetStaticProps<ArtistDetailPageProps, ArtistDetailPageParams> = async ({ params }) => {
    let data = params ? buildTimeCache.get(params.artistSlug) : null;
    let apiRequests = 0;

    if (!data) {
        ({ data, apiRequests } = await fetchData<ArtistDetailPageQuery, ArtistDetailPageQueryVariables>(
            gql`
                ${ArtistDetailPage.fragements.artist}

                query ArtistDetailPage($artistSlug: String!) {
                    artist(slug: $artistSlug) {
                        ...ArtistDetailPageArtist
                    }
                }
            `,
            params,
        ));
    }

    if (!data.artist) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            ...getSharedPageProps(apiRequests),
            artist: data.artist,
        },
        // Revalidate after 1 hour (= 3600 seconds).
        revalidate: 3600,
    };
};

export const getStaticPaths: GetStaticPaths<ArtistDetailPageParams> = async () => {
    return fetchStaticPaths(async () => {
        const { data } = await fetchData<ArtistDetailPageAllQuery>(gql`
            ${ArtistDetailPage.fragements.artist}

            query ArtistDetailPageAll {
                artistAll {
                    ...ArtistDetailPageArtist
                }
            }
        `);

        data.artistAll.forEach((artist) => buildTimeCache.set(artist.slug, { artist }));

        return data.artistAll.map((artist) => ({
            params: {
                artistSlug: artist.slug,
            },
        }));
    });
};
