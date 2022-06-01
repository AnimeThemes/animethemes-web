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
import { useMemo, useState } from "react";
import { FilterToggleButton } from "components/button";
import { SearchFilter, SearchFilterGroup, SearchFilterSortBy } from "components/search-filter";
import { Collapse } from "components/utils";
import { Listbox } from "components/listbox";
import {
    chain,
    getComparator, resourceAsComparator,
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
import useImage from "hooks/useImage";
import gql from "graphql-tag";
import fetchStaticPaths from "utils/fetchStaticPaths";
import getSharedPageProps from "utils/getSharedPageProps";

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

const performanceFilters = new Map([
    [ null, () => true ],
    [ "Solo", (performance) => performance.song.performances.length === 1 ],
    [ "Group", (performance) => performance.song.performances.length > 1 ]
]);
const performanceFilterOptions = [ ...performanceFilters.keys() ];

export default function ArtistDetailPage({ artist }) {
    const { largeCover } = useImage(artist);

    const aliasFilterOptions = useMemo(() => {
        const aliases = [ ...new Set(artist.performances.map((performance) => performance.as)) ].filter((alias) => alias);

        return [
            null,
            artist.name,
            ...aliases
        ];
    }, [ artist ]);

    const [ showFilter, toggleShowFilter ] = useToggle();
    const [ filterPerformance, setFilterPerformance ] = useState(performanceFilterOptions[0]);
    const [ filterAlias, setFilterAlias ] = useState(aliasFilterOptions[0]);
    const [ sortBy, setSortBy ] = useState(SONG_A_Z_ANIME);

    const themes = artist.performances
        .flatMap(
            (performance) => performance.song.themes.map(
                (theme) => ({ ...theme, ...performance })
            )
        )
        .filter((performance) => (
            filterAlias === null ||
            (filterAlias === artist.name && !performance.as) ||
            performance.as === filterAlias
        ))
        .filter(performanceFilters.get(filterPerformance))
        .sort(getComparator(sortBy));

    return (
        <>
            <SEO title={artist.name} image={largeCover}/>
            <Text variant="h1">{artist.name}</Text>
            <SidebarContainer>
                <Column style={{ "--gap": "24px" }}>
                    <CoverImage resourceWithImages={artist} alt={`Picture of ${artist.name}`}/>
                    <DescriptionList>
                        {!!artist.members?.length && (
                            <DescriptionList.Item title="Members">
                                <StyledList>
                                    {artist.members.map(({ member }) =>
                                        <Link key={member.slug} href={`/artist/${member.slug}`} passHref prefetch={false}>
                                            <Text as="a" link>
                                                {member.name}
                                            </Text>
                                        </Link>
                                    )}
                                </StyledList>
                            </DescriptionList.Item>
                        )}
                        {!!artist.groups?.length && (
                            <DescriptionList.Item title="Member of">
                                <StyledList>
                                    {artist.groups.map(({ group }) =>
                                        <Link key={group.slug} href={`/artist/${group.slug}`} passHref prefetch={false}>
                                            <Text as="a" link>
                                                {group.name}
                                            </Text>
                                        </Link>
                                    )}
                                </StyledList>
                            </DescriptionList.Item>
                        )}
                        {!!artist.resources && !!artist.resources.length && (
                            <DescriptionList.Item title="Links">
                                <StyledList>
                                    {artist.resources.sort(chain(resourceSiteComparator, resourceAsComparator)).map((resource) => (
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
                                    {performanceFilterOptions.map((option) => (
                                        <Listbox.Option key={option} value={option} hidden={!option}>{option ?? "Any"}</Listbox.Option>
                                    ))}
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
                        {themes.map((theme) => (
                            <ThemeSummaryCard
                                key={theme.anime.slug + theme.slug + theme.group}
                                theme={theme}
                                artist={artist}
                                expandable
                            />
                        ))}
                    </Column>
                </Column>
            </SidebarContainer>
        </>
    );
}

export async function getStaticProps({ params: { artistSlug } }) {
    const { data, apiRequests } = await fetchData(gql`
        ${ThemeSummaryCard.fragments.theme}
        ${ThemeSummaryCard.fragments.artist}
        ${ThemeSummaryCard.fragments.expandable}

        query($artistSlug: String!) {
            artist(slug: $artistSlug) {
                ...ThemeSummaryCard_artist
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
                            ...ThemeSummaryCard_theme
                            ...ThemeSummaryCard_theme_expandable
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
                }
                groups {
                    group {
                        slug
                        name
                    }
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
        }
    `, {
        artistSlug
    });

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
}

export async function getStaticPaths() {
    return fetchStaticPaths(async () => {
        const { data } = await fetchData(gql`
            query {
                artistAll {
                    slug
                }
            }
        `);

        return data.artistAll.map((artist) => ({
            params: {
                artistSlug: artist.slug
            }
        }));
    });
}
