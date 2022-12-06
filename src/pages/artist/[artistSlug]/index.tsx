import Link from "next/link";
import styled from "styled-components";
import { ExternalLink } from "components/external-link";
import { DescriptionList } from "components/description-list";
import { Text } from "components/text";
import { Column } from "components/box";
import { SidebarContainer } from "components/container";
import { ThemeSummaryCard } from "components/card";
import { CoverImage } from "components/image";
import useToggle from "hooks/useToggle";
import { memo, useMemo, useState } from "react";
import { FilterToggleButton } from "components/button";
import { SearchFilter, SearchFilterGroup, SearchFilterSortBy } from "components/search-filter";
import { Collapse } from "components/utils";
import { Listbox } from "components/listbox";
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
    SONG_Z_A_ANIME
} from "utils/comparators";
import { fetchData } from "lib/server";
import { SEO } from "components/seo";
import extractImages from "utils/extractImages";
import gql from "graphql-tag";
import fetchStaticPaths from "utils/fetchStaticPaths";
import getSharedPageProps from "utils/getSharedPageProps";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { ArtistDetailPageAllQuery, ArtistDetailPageQuery, ArtistDetailPageQueryVariables } from "generated/graphql";
import type { ParsedUrlQuery } from "querystring";
import type { RequiredNonNullable } from "utils/types";

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
type PerformanceFilterKey = "SOLO" | "GROUP" | null;

function getPerformanceFilter(key: PerformanceFilterKey): (performance: Performance) => boolean {
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
    artistSlug: string
}

export default function ArtistDetailPage({ artist }: ArtistDetailPageProps) {
    const { largeCover } = extractImages(artist);

    const aliasFilterOptions = useMemo(() => {
        const aliases = [ ...new Set(artist.performances.map((performance) => performance.as)) ].filter((alias) => alias);

        return [
            null,
            artist.name,
            ...aliases
        ];
    }, [ artist ]);

    const [ showFilter, toggleShowFilter ] = useToggle();
    const [ filterPerformance, setFilterPerformance ] = useState<PerformanceFilterKey>(null);
    const [ filterAlias, setFilterAlias ] = useState(aliasFilterOptions[0]);
    const [ sortBy, setSortBy ] = useState(SONG_A_Z_ANIME);

    const themes = useMemo(() =>
        artist.performances
            .filter((performance) =>
                filterAlias === null ||
                filterAlias === artist.name && !performance.as ||
                filterAlias === performance.as
            )
            .filter(getPerformanceFilter(filterPerformance))
            .flatMap((performance) => performance.song.themes)
            .sort(getComparator(sortBy)),
    [artist.name, artist.performances, filterAlias, filterPerformance, sortBy]
    );

    return <>
        <SEO title={artist.name} image={largeCover}/>
        <Text variant="h1">{artist.name}</Text>
        <SidebarContainer>
            <Column style={{ "--gap": "24px" }}>
                <CoverImage resourceWithImages={artist} alt={`Picture of ${artist.name}`}/>
                <DescriptionList>
                    {!!artist.members?.length && (
                        <DescriptionList.Item title="Members">
                            <StyledList>
                                {artist.members.map(({ member, as }) =>
                                    <Link
                                        key={member.slug}
                                        href={`/artist/${member.slug}`}
                                        passHref
                                        legacyBehavior>
                                        <Text as="a" link>
                                            {member.name}
                                            {as ? ` (as ${as})` : null}
                                        </Text>
                                    </Link>
                                )}
                            </StyledList>
                        </DescriptionList.Item>
                    )}
                    {!!artist.groups?.length && (
                        <DescriptionList.Item title="Member of">
                            <StyledList>
                                {artist.groups.map(({ group, as }) =>
                                    <Link
                                        key={group.slug}
                                        href={`/artist/${group.slug}`}
                                        passHref
                                        legacyBehavior>
                                        <Text as="a" link>
                                            {group.name}
                                            {as ? ` (as ${as})` : null}
                                        </Text>
                                    </Link>
                                )}
                            </StyledList>
                        </DescriptionList.Item>
                    )}
                    {!!artist.resources && !!artist.resources.length && (
                        <DescriptionList.Item title="Links">
                            <StyledList>
                                {artist.resources.sort(either(resourceSiteComparator).or(resourceAsComparator).chain()).map((resource) => (
                                    <ExternalLink key={resource.link} href={resource.link}>
                                        {resource.site}{!!resource.as && ` (${resource.as})`}
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
                    <FilterToggleButton onClick={toggleShowFilter}/>
                </StyledHeader>
                <Collapse collapse={!showFilter}>
                    <SearchFilterGroup>
                        <SearchFilter>
                            <Text variant="h2">Performed with</Text>
                            <Listbox value={filterPerformance} onChange={setFilterPerformance} resettable highlightNonDefault>
                                <Listbox.Option value={null} hidden>Any</Listbox.Option>
                                <Listbox.Option value="SOLO">Solo</Listbox.Option>
                                <Listbox.Option value="GROUP">Group</Listbox.Option>
                            </Listbox>
                        </SearchFilter>
                        <SearchFilter>
                            <Text variant="h2">Performed as</Text>
                            <Listbox value={filterAlias} onChange={setFilterAlias} resettable highlightNonDefault>
                                {aliasFilterOptions.map((option) => (
                                    <Listbox.Option key={option} value={option} hidden={!option}>{option ?? "Any"}</Listbox.Option>
                                ))}
                            </Listbox>
                        </SearchFilter>
                        <SearchFilterSortBy value={sortBy} setValue={setSortBy}>
                            <SearchFilterSortBy.Option value={SONG_A_Z_ANIME}>A ➜ Z (Anime)</SearchFilterSortBy.Option>
                            <SearchFilterSortBy.Option value={SONG_Z_A_ANIME}>Z ➜ A (Anime)</SearchFilterSortBy.Option>
                            <SearchFilterSortBy.Option value={SONG_A_Z}>A ➜ Z (Song)</SearchFilterSortBy.Option>
                            <SearchFilterSortBy.Option value={SONG_Z_A}>Z ➜ A (Song)</SearchFilterSortBy.Option>
                            <SearchFilterSortBy.Option value={SONG_OLD_NEW}>Old ➜ New</SearchFilterSortBy.Option>
                            <SearchFilterSortBy.Option value={SONG_NEW_OLD}>New ➜ Old</SearchFilterSortBy.Option>
                        </SearchFilterSortBy>
                    </SearchFilterGroup>
                </Collapse>
                <Column style={{ "--gap": "16px" }}>
                    <ArtistThemes themes={themes} artist={artist}/>
                </Column>
            </Column>
        </SidebarContainer>
    </>;
}

interface ArtistThemesProps {
    themes: Performance["song"]["themes"]
    artist: ArtistDetailPageProps["artist"]
}

const ArtistThemes = memo(function ArtistThemes({ themes, artist }: ArtistThemesProps) {
    const themeCards = themes.map((theme) => (
        <ThemeSummaryCard
            key={theme.anime?.slug + theme.slug + theme.group}
            theme={theme}
            artist={artist}
            expandable
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
                        slug
                        group
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
        ({ data, apiRequests } = await fetchData<ArtistDetailPageQuery, ArtistDetailPageQueryVariables>(gql`
            ${ArtistDetailPage.fragements.artist}

            query ArtistDetailPage($artistSlug: String!) {
                artist(slug: $artistSlug) {
                    ...ArtistDetailPageArtist
                }
            }
        `, params));
    }

    if (!data.artist) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            ...getSharedPageProps(apiRequests),
            artist: data.artist
        },
        // Revalidate after 1 hour (= 3600 seconds).
        revalidate: 3600
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
                artistSlug: artist.slug
            }
        }));
    });
};
