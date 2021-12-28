import { SidebarContainer } from "components/container";
import styled from "styled-components";
import { AnimeSummaryCard } from "components/card";
import useImage from "hooks/useImage";
import { Box, Flex } from "components/box";
import { Text } from "components/text";
import { AspectRatio, Collapse } from "components/utils";
import { useState } from "react";
import { SearchFilterGroup, SearchFilterSortBy } from "components/search-filter";
import useToggle from "hooks/useToggle";
import { FilterToggleButton } from "components/button";
import {
    animeNameComparator,
    animePremiereComparator,
    chain,
    resourceSiteComparator,
    reverse
} from "utils/comparators";
import { fetchData } from "lib/server";
import { DescriptionList } from "components/description-list";
import { ExternalLink } from "components/external-link";
import { gapsColumn } from "styles/mixins";
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
const StyledList = styled.div`
    display: flex;
    flex-direction: column;

    ${gapsColumn("0.5rem")}

    text-align: center;
`;

const sortByComparators = new Map([
    [ "A ➜ Z", animeNameComparator ],
    [ "Z ➜ A", reverse(animeNameComparator) ],
    [ "Old ➜ New", chain(animePremiereComparator, animeNameComparator) ],
    [ "New ➜ Old", chain(reverse(animePremiereComparator), animeNameComparator) ]
]);
const sortByOptions = [ ...sortByComparators.keys() ];

export default function StudioDetailPage({ studio }) {
    const anime = studio.anime;
    const images = [
        [ useImage(anime[0]), anime[0] ],
        [ useImage(anime[1]), anime[1] ],
        [ useImage(anime[2]), anime[2] ],
        [ useImage(anime[3]), anime[3] ]
    ].map(([ images, anime ]) => [ images.largeCover, anime ]).filter(([ image ]) => !!image);

    const [ showFilter, toggleShowFilter ] = useToggle();
    const [ sortBy, setSortBy ] = useState(sortByOptions[0]);

    const animeSorted = [ ...anime ].sort(sortByComparators.get(sortBy));

    const hasDescriptionList = !!studio.resources && !!studio.resources.length;

    return (
        <Box gapsColumn="1.5rem">
            <SEO title={studio.name}/>
            <Text variant="h1">{studio.name}</Text>
            <SidebarContainer>
                <Box display={[ hasDescriptionList ? "block" : "none", "block" ]}>
                    <AspectRatio display={[ "none", "block" ]} mb="1.5rem" ratio={2 / 3}>
                        <StyledCoverContainer>
                            {images.map(([ image, anime ]) => (
                                <StyledCoverItemContainer key={image}>
                                    <StyledCover loading="lazy" src={image} alt={`Cover image of ${anime.name}`} title={anime.name}/>
                                </StyledCoverItemContainer>
                            ))}
                        </StyledCoverContainer>
                    </AspectRatio>
                    <DescriptionList>
                        {!!studio.resources && !!studio.resources.length && (
                            <DescriptionList.Item title="Links">
                                <StyledList>
                                    {studio.resources.sort(resourceSiteComparator).map((resource) => (
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

export async function getStaticProps({ params: { studioSlug } }) {
    const { data } = await fetchData(`
        #graphql

        query($studioSlug: String!) {
            studio(slug: $studioSlug) {
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
                resources {
                    link
                    site
                }
            }
        }
    `, {
        studioSlug
    });

    if (!data.studio) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            studio: data.studio
        },
        revalidate: 5 * 60
    };
}

export async function getStaticPaths() {
    const { data } = await fetchData(`
        #graphql

        query {
            studioAll {
                slug
            }
        }
    `);

    const paths = data.studioAll.map((studio) => ({
        params: {
            studioSlug: studio.slug
        }
    }));

    return {
        paths,
        fallback: "blocking"
    };
}
