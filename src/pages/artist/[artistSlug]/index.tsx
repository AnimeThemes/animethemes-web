import React, { memo, useCallback, useContext, useMemo, useState } from "react";
import styled from "styled-components";
import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

import type { ResultOf } from "@graphql-typed-document-node/core";
import { uniq, uniqBy } from "lodash-es";
import type { ParsedUrlQuery } from "querystring";

import { Column } from "@/components/box/Flex";
import { FilterToggleButton } from "@/components/button/FilterToggleButton";
import { Card } from "@/components/card/Card";
import { ThemeSummaryCard } from "@/components/card/ThemeSummaryCard";
import { SidebarContainer } from "@/components/container/SidebarContainer";
import { DescriptionList } from "@/components/description-list/DescriptionList";
import { ExternalLink } from "@/components/external-link/ExternalLink";
import { MultiCoverImage } from "@/components/image/MultiCoverImage";
import { Listbox, ListboxOption } from "@/components/listbox/Listbox";
import { Markdown } from "@/components/markdown/Markdown";
import { SearchFilter } from "@/components/search-filter/SearchFilter";
import { SearchFilterGroup } from "@/components/search-filter/SearchFilterGroup";
import { SearchFilterSortBy } from "@/components/search-filter/SearchFilterSortBy";
import { SEO } from "@/components/seo/SEO";
import { Text } from "@/components/text/Text";
import { Collapse } from "@/components/utils/Collapse";
import { HeightTransition } from "@/components/utils/HeightTransition";
import PlayerContext, { createWatchListItem } from "@/context/playerContext";
import createApolloClient from "@/graphql/createApolloClient";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";
import useToggle from "@/hooks/useToggle";
import {
    compare,
    getComparator,
    SONG_A_Z,
    SONG_A_Z_ANIME,
    SONG_NEW_OLD,
    SONG_OLD_NEW,
    SONG_Z_A,
    SONG_Z_A_ANIME,
} from "@/utils/comparators";
import extractMultipleImages from "@/utils/extractMultipleImages";
import fetchStaticPaths from "@/utils/fetchStaticPaths";
import getSharedPageProps from "@/utils/getSharedPageProps";
import { serializeMarkdownSafe } from "@/utils/serializeMarkdown";

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

const fragments = {
    artist: graphql(`
        fragment ArtistDetailPageArtist on Artist {
            ...ThemeSummaryCardArtist
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
                            __typename
                            ... on Artist {
                                slug
                                name
                            }
                            ... on Membership {
                                group {
                                    slug
                                    name
                                }
                            }
                        }
                        alias
                        as
                    }
                    animethemes {
                        ...ThemeSummaryCardTheme
                        ...ThemeSummaryCardThemeExpandable
                        id
                        type
                        sequence
                        animethemeentries {
                            videos {
                                nodes {
                                    id
                                }
                            }
                        }
                        group {
                            name
                            slug
                        }
                        anime {
                            slug
                            name
                            year
                            season
                        }
                        song {
                            title
                        }
                    }
                }
            }
            memberships {
                alias
                as
                group {
                    ...ThemeSummaryCardArtist
                    slug
                    name
                }
                performances {
                    alias
                    as
                    song {
                        id
                        title
                        performances {
                            artist {
                                __typename
                                ... on Artist {
                                    slug
                                    name
                                }
                                ... on Membership {
                                    group {
                                        slug
                                        name
                                    }
                                }
                            }
                            alias
                            as
                        }
                        animethemes {
                            ...ThemeSummaryCardTheme
                            ...ThemeSummaryCardThemeExpandable
                            id
                            type
                            sequence
                            animethemeentries {
                                videos {
                                    nodes {
                                        id
                                    }
                                }
                            }
                            group {
                                name
                                slug
                            }
                            anime {
                                slug
                                name
                                year
                                season
                            }
                            song {
                                title
                            }
                        }
                    }
                }
            }
            groupships {
                alias
                as
                member {
                    slug
                    name
                }
                performances {
                    alias
                    as
                    song {
                        id
                        title
                        performances {
                            artist {
                                __typename
                                ... on Artist {
                                    slug
                                    name
                                }
                                ... on Membership {
                                    group {
                                        slug
                                        name
                                    }
                                }
                            }
                            alias
                            as
                        }
                        animethemes {
                            ...ThemeSummaryCardTheme
                            ...ThemeSummaryCardThemeExpandable
                            id
                            type
                            sequence
                            animethemeentries {
                                videos {
                                    nodes {
                                        id
                                    }
                                }
                            }
                            group {
                                name
                                slug
                            }
                            anime {
                                slug
                                name
                                year
                                season
                            }
                            song {
                                title
                            }
                        }
                    }
                }
            }
            members {
                edges {
                    alias
                    as
                    notes
                    node {
                        ...ArtistSummaryCardArtist
                        slug
                        name
                    }
                }
            }
            groups {
                edges {
                    alias
                    as
                    notes
                    node {
                        slug
                        name
                    }
                }
            }
            images {
                edges {
                    ...extractMultipleImagesImageArtistEdge
                }
            }
            resources {
                edges {
                    node {
                        link
                        site
                        siteLocalized
                    }
                    as
                }
            }
        }
    `),
};

const propsQuery = graphql(`
    query ArtistDetailPage($artistSlug: String!) {
        artist(slug: $artistSlug) {
            ...ArtistDetailPageArtist
            information
        }
    }
`);

const pathsQuery = graphql(`
    query ArtistDetailPageAll {
        artistPagination {
            data {
                ...ArtistDetailPageArtist
                slug
                information
            }
        }
    }
`);

type Performance =
    | ResultOf<typeof fragments.artist>["performances"][number]
    | ResultOf<typeof fragments.artist>["groupships"][number]["performances"][number];

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

interface ArtistDetailPageProps {
    artist: FragmentType<typeof fragments.artist>;
    informationMarkdownSource: MDXRemoteSerializeResult | null;
}

interface ArtistDetailPageParams extends ParsedUrlQuery {
    artistSlug: string;
}

export default function ArtistDetailPage({ artist: artistFragment, informationMarkdownSource }: ArtistDetailPageProps) {
    const artist = getFragmentData(fragments.artist, artistFragment);
    const images = extractMultipleImages(artist.images.edges);
    const [collapseInformation, setCollapseInformation] = useState(true);

    const performances = useMemo(
        () =>
            uniqBy(
                [...artist.performances, ...artist.groupships.flatMap((groupship) => groupship.performances)],
                (performance) => performance.song.id,
            ),
        [artist.performances, artist.groupships],
    );

    const characters = useMemo(
        () =>
            uniq([
                ...performances.map((performance) => performance.as),
                ...artist.groups.edges.map((group) => group.as),
            ]).filter((alias) => alias) as Array<string>,
        [performances, artist.groups],
    );
    const aliases = useMemo(
        () =>
            uniq([
                ...performances.map((performance) => performance.alias),
                ...artist.groups.edges.map((group) => group.alias),
            ]).filter((alias) => alias) as Array<string>,
        [performances, artist.groups],
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
        (performances: Array<Performance>, groupAs: string | null, groupAlias: string | null) =>
            performances.filter(
                (performance) =>
                    performance.song?.animethemes[0]?.animethemeentries[0]?.videos.nodes[0] &&
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
        (performances: Array<Performance>) =>
            performances.flatMap((performance) => performance.song.animethemes).sort(getComparator(sortBy)),
        [sortBy],
    );

    const performancesGroupedByAlias = useMemo(
        () =>
            filterPerformances(performances.filter(getPerformanceFilter(filterPerformance)), null, null).reduce(
                (prev, curr) => {
                    const group = prev.get(curr.alias);
                    if (!group) {
                        prev.set(curr.alias, [curr]);
                    } else {
                        group.push(curr);
                    }
                    return prev;
                },
                new Map<string | null, Array<Performance>>(),
            ),
        [performances, filterPerformance, filterPerformances],
    );
    const performancesAsSelf = useMemo(() => performancesGroupedByAlias.get(null) ?? [], [performancesGroupedByAlias]);

    const memberships = useMemo(
        () =>
            artist.memberships.map((membership) => ({
                ...membership,
                group: {
                    ...membership.group,
                    performances:
                        filterPerformance === "SOLO"
                            ? []
                            : filterPerformances(membership.performances, membership.as, membership.alias),
                },
            })),
        [artist.memberships, filterPerformance, filterPerformances],
    );

    return (
        <>
            <SEO title={artist.name} image={images[0]?.link} />
            <Text variant="h1">{artist.name}</Text>
            <SidebarContainer>
                <Column style={{ "--gap": "24px" }}>
                    <MultiCoverImage items={images.map((image) => ({ largeCover: image.link, name: artist.name }))} />
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
                        {!!artist.members.edges.length && (
                            <DescriptionList.Item title="Members">
                                <StyledList>
                                    {artist.members.edges.map(({ node, alias, as, notes }) => (
                                        <Column key={node.slug}>
                                            <Text as={Link} href={`/artist/${node.slug}`} link>
                                                {alias ? alias : node.name}
                                            </Text>
                                            {as || notes ? (
                                                <Text variant="small" color="text-muted">
                                                    {[as ? `As ${as}` : null, notes || null]
                                                        .filter(Boolean)
                                                        .join(" • ")}
                                                </Text>
                                            ) : null}
                                        </Column>
                                    ))}
                                </StyledList>
                            </DescriptionList.Item>
                        )}
                        {!!artist.groups.edges.length && (
                            <DescriptionList.Item title="Member of">
                                <StyledList>
                                    {artist.groups.edges.map(({ node, alias, as, notes }) => (
                                        <Column key={node.slug}>
                                            <Text as={Link} href={`/artist/${node.slug}`} link>
                                                {node.name}
                                            </Text>
                                            {alias || as || notes ? (
                                                <Text variant="small" color="text-muted">
                                                    {[
                                                        alias ? `As ${alias}` : null,
                                                        as ? `As ${as}` : null,
                                                        notes || null,
                                                    ]
                                                        .filter(Boolean)
                                                        .join(" • ")}
                                                </Text>
                                            ) : null}
                                        </Column>
                                    ))}
                                </StyledList>
                            </DescriptionList.Item>
                        )}
                        {!!artist.resources.edges.length && (
                            <DescriptionList.Item title="Links">
                                <StyledList>
                                    {[...artist.resources.edges]
                                        .sort((a, b) => compare(a.node.site, b.node.site) || compare(a.as, b.as))
                                        .map((resource) => (
                                            <ExternalLink key={resource.node.link} href={resource.node.link}>
                                                {resource.node.siteLocalized}
                                                {!!resource.as && ` (${resource.as})`}
                                            </ExternalLink>
                                        ))}
                                </StyledList>
                            </DescriptionList.Item>
                        )}
                    </DescriptionList>
                </Column>
                <Column style={{ "--gap": "24px" }}>
                    {!!informationMarkdownSource && (
                        <>
                            <Text variant="h2">Information</Text>
                            <Card $hoverable onClick={() => setCollapseInformation(!collapseInformation)}>
                                <HeightTransition>
                                    <Text as="div" maxLines={collapseInformation ? 2 : undefined}>
                                        <Markdown source={informationMarkdownSource} />
                                    </Text>
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
                        {memberships.map((membership) =>
                            membership.performances.length ? (
                                <Column key={membership.group.slug} style={{ "--gap": "16px" }}>
                                    <Text variant="h2">
                                        {membership.alias ? `As ${membership.alias} ` : null}
                                        {membership.as ? `As ${membership.as} ` : null}
                                        In{" "}
                                        <Link href={`/artist/${membership.group.slug}`}>
                                            <Text link>{membership.group.name}</Text>
                                        </Link>
                                        <Text color="text-disabled"> ({membership.performances.length})</Text>
                                    </Text>
                                    <ArtistThemes
                                        themes={toSortedThemes(membership.performances)}
                                        artist={membership.group}
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
    themes: Performance["song"]["animethemes"];
    artist: ResultOf<typeof fragments.artist> | ResultOf<typeof fragments.artist>["memberships"][number]["group"];
}

const ArtistThemes = memo(function ArtistThemes({ themes, artist }: ArtistThemesProps) {
    const { setWatchListFactory, setWatchList, setCurrentWatchListItem } = useContext(PlayerContext);

    function playArtistThemes(initiatingThemeIndex: number, entryIndex = 0, videoIndex = 0) {
        const watchList = themes.flatMap((theme, index) => {
            const entry =
                initiatingThemeIndex == index ? theme.animethemeentries[entryIndex] : theme.animethemeentries[0];
            const video = initiatingThemeIndex == index ? entry?.videos.nodes[videoIndex] : entry?.videos.nodes[0];

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
            expandable={theme}
            onPlay={(entryIndex, videoIndex) => playArtistThemes(index, entryIndex, videoIndex)}
        />
    ));

    return <>{themeCards}</>;
});

const buildTimeCache: Map<string, FragmentType<typeof fragments.artist> & { information: string | null }> = new Map();

export const getStaticProps: GetStaticProps<ArtistDetailPageProps, ArtistDetailPageParams> = async ({ params }) => {
    const client = createApolloClient();

    let artist = params ? buildTimeCache.get(params.artistSlug) : null;

    if (!artist) {
        artist = (
            await client.query({
                query: propsQuery,
                variables: params,
            })
        ).data.artist;
    }

    if (!artist) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            ...getSharedPageProps(),
            artist,
            informationMarkdownSource: artist.information
                ? (await serializeMarkdownSafe(artist.information)).source
                : null,
        },
        // Revalidate after 1 hour (= 3600 seconds).
        revalidate: 3600,
    };
};

export const getStaticPaths: GetStaticPaths<ArtistDetailPageParams> = async () => {
    return fetchStaticPaths(async () => {
        const client = createApolloClient();

        const { data } = await client.query({
            query: pathsQuery,
        });

        for (const artist of data.artistPagination.data) {
            buildTimeCache.set(artist.slug, artist);
        }

        return data.artistPagination.data.map((artist) => ({
            params: {
                artistSlug: artist.slug,
            },
        }));
    });
};
