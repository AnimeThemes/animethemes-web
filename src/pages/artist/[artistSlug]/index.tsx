import React, { useCallback } from "react";
import { memo, useMemo, useState } from "react";
import { useContext } from "react";
import styled from "styled-components";
import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

import gql from "graphql-tag";
import type { ParsedUrlQuery } from "querystring";

import { Column } from "@/components/box/Flex";
import { FilterToggleButton } from "@/components/button/FilterToggleButton";
import { ThemeSummaryCard } from "@/components/card/ThemeSummaryCard";
import { SidebarContainer } from "@/components/container/SidebarContainer";
import { DescriptionList } from "@/components/description-list/DescriptionList";
import { ExternalLink } from "@/components/external-link/ExternalLink";
import { CoverImage } from "@/components/image/CoverImage";
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
import extractImages from "@/utils/extractImages";
import fetchStaticPaths from "@/utils/fetchStaticPaths";
import getSharedPageProps from "@/utils/getSharedPageProps";
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

interface ArtistDetailPageProps extends RequiredNonNullable<ArtistDetailPageQuery> {}

interface ArtistDetailPageParams extends ParsedUrlQuery {
    artistSlug: string;
}

export default function ArtistDetailPage({ artist }: ArtistDetailPageProps) {
    const { largeCover } = extractImages(artist);

    const aliasFilterOptions = useMemo(() => {
        const aliases = [
            ...new Set([
                ...artist.performances.map((performance) => performance.as),
                ...artist.groups.map((group) => group.as),
            ]),
        ].filter((alias) => alias);

        return [null, artist.name, ...aliases];
    }, [artist]);

    const [showFilter, toggleShowFilter] = useToggle();
    const [filterPerformance, setFilterPerformance] = useState<string | null>(null);
    const [filterAlias, setFilterAlias] = useState(aliasFilterOptions[0]);
    const [sortBy, setSortBy] = useState<
        | typeof SONG_A_Z_ANIME
        | typeof SONG_Z_A_ANIME
        | typeof SONG_A_Z
        | typeof SONG_Z_A
        | typeof SONG_OLD_NEW
        | typeof SONG_NEW_OLD
    >(SONG_A_Z_ANIME);

    const filterPerformances = useCallback(
        (performances: ArtistDetailPageProps["artist"]["performances"], groupAs: string | null) =>
            performances
                .filter(
                    (performance) =>
                        filterAlias === null ||
                        (filterAlias === artist.name && !performance.as && !groupAs) ||
                        ((filterAlias === groupAs || filterAlias === performance.as) &&
                            performance.song?.themes[0]?.entries[0]?.videos[0]),
                )
                .flatMap((performance) => performance.song.themes)
                .sort(getComparator(sortBy)),
        [artist.name, filterAlias, sortBy],
    );

    const themes = useMemo(
        () => filterPerformances(artist.performances.filter(getPerformanceFilter(filterPerformance)), null),
        [artist.performances, filterPerformance, filterPerformances],
    );

    const groups = useMemo(
        () =>
            artist.groups.map((group) => ({
                ...group,
                group: {
                    ...group.group,
                    performances:
                        filterPerformance === "SOLO" ? [] : filterPerformances(group.group.performances, group.as),
                },
            })),
        [artist.groups, filterPerformance, filterPerformances],
    );

    return (
        <>
            <SEO title={artist.name} image={largeCover} />
            <Text variant="h1">{artist.name}</Text>
            <SidebarContainer>
                <Column style={{ "--gap": "24px" }}>
                    <CoverImage resourceWithImages={artist} alt={`Picture of ${artist.name}`} />
                    <DescriptionList>
                        {!!artist.members?.length && (
                            <DescriptionList.Item title="Members">
                                <StyledList>
                                    {artist.members.map(({ member, as }) => (
                                        <Link key={member.slug} href={`/artist/${member.slug}`} passHref legacyBehavior>
                                            <Text as="a" link>
                                                {member.name}
                                                {as ? ` (as ${as})` : null}
                                            </Text>
                                        </Link>
                                    ))}
                                </StyledList>
                            </DescriptionList.Item>
                        )}
                        {!!artist.groups?.length && (
                            <DescriptionList.Item title="Member of">
                                <StyledList>
                                    {artist.groups.map(({ group, as }) => (
                                        <Link key={group.slug} href={`/artist/${group.slug}`} passHref legacyBehavior>
                                            <Text as="a" link>
                                                {group.name}
                                                {as ? ` (as ${as})` : null}
                                            </Text>
                                        </Link>
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
                    <StyledHeader>
                        <Text variant="h2">
                            Song Performances
                            <Text color="text-disabled"> ({themes.length})</Text>
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
                                    value={filterAlias}
                                    onValueChange={setFilterAlias}
                                    defaultValue={null}
                                    nullable
                                    resettable
                                    highlightNonDefault
                                >
                                    {aliasFilterOptions.map((option) => (
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
                        {themes.length ? (
                            <Column style={{ "--gap": "16px" }}>
                                <ArtistThemes themes={themes} artist={artist} />
                            </Column>
                        ) : null}
                        {groups.map((group) =>
                            group.group.performances.length ? (
                                <Column key={group.group.slug} style={{ "--gap": "16px" }}>
                                    <Text variant="h2">
                                        {group.as ? `As ${group.as} ` : null}
                                        In{" "}
                                        <Link href={`/artist/${group.group.slug}`}>
                                            <Text link>{group.group.name}</Text>
                                        </Link>
                                        <Text color="text-disabled"> ({group.group.performances.length})</Text>
                                    </Text>
                                    <ArtistThemes themes={group.group.performances} artist={group.group} />
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
            name
            performances {
                as
                song {
                    id
                    title
                    performances {
                        artist {
                            slug
                            name
                        }
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
                as
            }
            groups {
                group {
                    slug
                    name
                    performances {
                        as
                        song {
                            id
                            title
                            performances {
                                artist {
                                    slug
                                    name
                                }
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
                as
            }
            resources {
                link
                site
                as
            }
            images {
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
