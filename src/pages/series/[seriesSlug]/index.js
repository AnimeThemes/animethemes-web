import { SidebarContainer } from "components/container";
import styled from "styled-components";
import { AnimeSummaryCard } from "components/card";
import useImage from "hooks/useImage";
import { Box, Flex } from "components/box";
import { Text } from "components/text";
import { AspectRatio, Collapse } from "components/utils";
import useToggle from "hooks/useToggle";
import { useState } from "react";
import { SearchFilterGroup, SearchFilterSortBy } from "components/search-filter";
import { FilterToggleButton } from "components/button";
import { animeNameComparator, animePremiereComparator, chain, reverse } from "utils/comparators";
import { fetchData } from "lib/server";
import { SEO } from "components/seo";

const StyledCoverContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    border-radius: 0.5rem;
    overflow: hidden;
`;
const StyledCoverItemContainer = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
`;
const StyledCover = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const sortByComparators = new Map([
    [ "Old ➜ New", chain(animePremiereComparator, animeNameComparator) ],
    [ "New ➜ Old", chain(reverse(animePremiereComparator), animeNameComparator) ],
    [ "A ➜ Z", animeNameComparator ],
    [ "Z ➜ A", reverse(animeNameComparator) ]
]);
const sortByOptions = [ ...sortByComparators.keys() ];

export default function SeriesDetailPage({ series }) {
    const anime = series.anime;

    const images = [
        [ useImage(anime[0]), anime[0] ],
        [ useImage(anime[1]), anime[1] ],
        [ useImage(anime[2]), anime[2] ],
        [ useImage(anime[3]), anime[3] ]
    ].map(([ images, anime ]) => [ images.largeCover, anime ]).filter(([ image ]) => !!image);

    const [ showFilter, toggleShowFilter ] = useToggle();
    const [ sortBy, setSortBy ] = useState(sortByOptions[0]);

    const animeSorted = [ ...anime ].sort(sortByComparators.get(sortBy));

    return (
        <Box gapsColumn="1.5rem">
            <SEO title={series.name}/>
            <Text variant="h1">{series.name}</Text>
            <SidebarContainer>
                <Box display={[ "none", undefined, "block" ]} gapsColumn="1.5rem">
                    <AspectRatio ratio={2 / 3}>
                        <StyledCoverContainer>
                            {images.map(([ image, anime ]) => (
                                <StyledCoverItemContainer key={image}>
                                    <StyledCover loading="lazy" src={image} alt={`Cover image of ${anime.name}`} title={anime.name}/>
                                </StyledCoverItemContainer>
                            ))}
                        </StyledCoverContainer>
                    </AspectRatio>
                </Box>
                <Box gapsColumn="1.5rem">
                    <Flex justifyContent="space-between" alignItems="center">
                        <Text variant="h2">
                            Anime
                            <Text color="text-disabled"> ({anime.length})</Text>
                        </Text>
                        <FilterToggleButton onClick={toggleShowFilter}/>
                    </Flex>
                    <Collapse collapse={!showFilter}>
                        <SearchFilterGroup>
                            <SearchFilterSortBy
                                options={sortByOptions}
                                value={sortBy}
                                setValue={setSortBy}
                            />
                        </SearchFilterGroup>
                    </Collapse>
                    <Box gapsColumn="1rem">
                        {animeSorted.map((anime) => (
                            <AnimeSummaryCard key={anime.slug} anime={anime}/>
                        ))}
                    </Box>
                </Box>
            </SidebarContainer>
        </Box>
    );
}

export async function getStaticProps({ params: { seriesSlug } }) {
    const { data } = await fetchData(`
        #graphql

        query($seriesSlug: String!) {
            series(slug: $seriesSlug) {
                slug
                name
                anime {
                    name
                    slug
                    year
                    season
                    themes {
                        slug
                        type
                        sequence
                        entries {
                            version
                            videos {
                                tags
                            }
                        }
                    }
                    resources {
                        site
                        link
                    }
                    images {
                        facet
                        link
                    }
                }
            }
        }
    `, {
        seriesSlug
    });

    if (!data.series) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            series: data.series
        },
        revalidate: 5 * 60
    };
}

export async function getStaticPaths() {
    const { data } = await fetchData(`
        #graphql

        query {
            seriesAll {
                slug
            }
        }
    `);

    const paths = data.seriesAll.map((series) => ({
        params: {
            seriesSlug: series.slug
        }
    }));

    return {
        paths,
        fallback: "blocking"
    };
}
