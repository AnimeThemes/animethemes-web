import Link from "next/link";
import styled from "styled-components";
import { ExternalLink } from "components/external-link";
import { DescriptionList } from "components/description-list";
import { Text } from "components/text";
import { Box, Flex } from "components/box";
import { SidebarContainer } from "components/container";
import { gapsColumn } from "styles/mixins";
import { ThemeSummaryCard } from "components/card";
import { CoverImage } from "components/image";
import useToggle from "hooks/useToggle";
import { useMemo, useState } from "react";
import { FilterToggleButton } from "components/button";
import { SearchFilterGroup, SearchFilterSortBy } from "components/search-filter";
import { Collapse } from "components/utils";
import { Listbox } from "components/listbox";
import {
    animeNameComparator,
    animePremiereComparator,
    chain,
    resourceSiteComparator,
    reverse,
    songTitleComparator
} from "utils/comparators";
import { fetchData } from "lib/server";
import { SEO } from "components/seo";
import useImage from "hooks/useImage";

const StyledList = styled.div`
    display: flex;
    flex-direction: column;

    ${gapsColumn("0.5rem")}

    text-align: center;
`;

const performanceFilters = new Map([
    [ "Any", () => true ],
    [ "Solo", (performance) => performance.song.performances.length === 1 ],
    [ "Group", (performance) => performance.song.performances.length > 1 ]
]);
const performanceFilterOptions = [ ...performanceFilters.keys() ];

const toAnime = (comparator) => (a, b) => comparator(a.anime, b.anime);
const sortByComparators = new Map([
    [ "A ➜ Z (Song)", songTitleComparator ],
    [ "Z ➜ A (Song)", reverse(songTitleComparator) ],
    [ "A ➜ Z (Anime)", chain(toAnime(animeNameComparator), songTitleComparator) ],
    [ "Z ➜ A (Anime)", chain(reverse(toAnime(animeNameComparator)), songTitleComparator) ],
    [ "Old ➜ New", chain(toAnime(animePremiereComparator), toAnime(animeNameComparator), songTitleComparator) ],
    [ "New ➜ Old", chain(reverse(toAnime(animePremiereComparator)), toAnime(animeNameComparator), songTitleComparator) ]
]);
const sortByOptions = [ ...sortByComparators.keys() ];

export default function ArtistDetailPage({ artist }) {
    const { largeCover } = useImage(artist);

    const aliasFilterOptions = useMemo(() => {
        const aliases = [ ...new Set(artist.performances.map((performance) => performance.as)) ].filter((alias) => alias);

        return [
            "Any",
            artist.name,
            ...aliases
        ];
    }, [ artist ]);

    const [ showFilter, toggleShowFilter ] = useToggle();
    const [ filterPerformance, setFilterPerformance ] = useState(performanceFilterOptions[0]);
    const [ filterAlias, setFilterAlias ] = useState(aliasFilterOptions[0]);
    const [ sortBy, setSortBy ] = useState(sortByOptions[0]);

    const themes = artist.performances
        .flatMap(
            (performance) => performance.song.themes.map(
                (theme) => ({ ...theme, ...performance })
            )
        )
        .filter((performance) => (
            filterAlias === "Any" ||
            (filterAlias === artist.name && !performance.as) ||
            performance.as === filterAlias
        ))
        .filter(performanceFilters.get(filterPerformance))
        .sort(sortByComparators.get(sortBy));

    return (
        <Box gapsColumn="1.5rem">
            <SEO title={artist.name} image={largeCover}/>
            <Text variant="h1">{artist.name}</Text>
            <SidebarContainer>
                <Box gapsColumn="1.5rem">
                    <CoverImage resourceWithImages={artist} alt={`Picture of ${artist.name}`}/>
                    <DescriptionList>
                        {!!artist.members?.length && (
                            <DescriptionList.Item title="Members">
                                <StyledList>
                                    {artist.members.map(({ member }) =>
                                        <Link key={member.slug} href={`/artist/${member.slug}`} passHref>
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
                                        <Link key={group.slug} href={`/artist/${group.slug}`} passHref>
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
                                    {artist.resources.sort(resourceSiteComparator).map((resource) => (
                                        <ExternalLink key={resource.link} href={resource.link}>
                                            {resource.site}
                                        </ExternalLink>
                                    ))}
                                </StyledList>
                            </DescriptionList.Item>
                        )}
                    </DescriptionList>
                </Box>
                <Box gapsColumn="1.5rem">
                    <Flex justifyContent="space-between" alignItems="center">
                        <Text variant="h2">
                            Song Performances
                            <Text color="text-disabled"> ({themes.length})</Text>
                        </Text>
                        <FilterToggleButton onClick={toggleShowFilter}/>
                    </Flex>
                    <Collapse collapse={!showFilter}>
                        <SearchFilterGroup>
                            <Flex flexDirection="column" alignItems="stretch" gapsColumn="0.5rem">
                                <Text variant="h2">Performed with</Text>
                                <Listbox
                                    options={performanceFilterOptions}
                                    selectedValue={filterPerformance}
                                    onSelect={setFilterPerformance}
                                    defaultValue={performanceFilterOptions[0]}
                                    resettable
                                />
                            </Flex>
                            <Flex flexDirection="column" alignItems="stretch" gapsColumn="0.5rem">
                                <Text variant="h2">Performed as</Text>
                                <Listbox
                                    options={aliasFilterOptions}
                                    selectedValue={filterAlias}
                                    onSelect={setFilterAlias}
                                    defaultValue={aliasFilterOptions[0]}
                                    resettable
                                />
                            </Flex>
                            <SearchFilterSortBy
                                options={sortByOptions}
                                value={sortBy}
                                setValue={setSortBy}
                            />
                        </SearchFilterGroup>
                    </Collapse>
                    <Box gapsColumn="1rem">
                        {themes.map((theme) => (
                            <ThemeSummaryCard key={theme.anime.slug + theme.slug + theme.group} theme={theme} artist={artist}/>
                        ))}
                    </Box>
                </Box>
            </SidebarContainer>
        </Box>
    );
}

export async function getStaticProps({ params: { artistSlug } }) {
    const { data } = await fetchData(`
        #graphql

        query($artistSlug: String!) {
            artist(slug: $artistSlug) {
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
                            slug
                            group
                            anime {
                                slug
                                name
                                year
                                season
                                images {
                                    facet
                                    link
                                }
                            }
                            entries {
                                version
                                videos {
                                    tags
                                }
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
            artist: data.artist
        },
        revalidate: 5 * 60
    };
}

export async function getStaticPaths() {
    const { data } = await fetchData(`
        #graphql

        query {
            artistAll {
                slug
            }
        }
    `);

    const paths = data.artistAll.map((artist) => ({
        params: {
            artistSlug: artist.slug
        }
    }));

    return {
        paths,
        fallback: "blocking"
    };
}
