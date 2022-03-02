import { SidebarContainer } from "components/container";
import styled from "styled-components";
import { AnimeSummaryCard } from "components/card";
import { Column, Row } from "components/box";
import { Text } from "components/text";
import { Collapse } from "components/utils";
import useToggle from "hooks/useToggle";
import { useState } from "react";
import { SearchFilterGroup, SearchFilterSortBy } from "components/search-filter";
import { FilterToggleButton } from "components/button";
import { animeNameComparator, animePremiereComparator, chain, reverse } from "utils/comparators";
import { fetchData } from "lib/server";
import { SEO } from "components/seo";
import theme from "theme";
import { MultiCoverImage } from "components/image";

const StyledDesktopOnly = styled.div`
    gap: 24px;
    
    @media (max-width: ${theme.breakpoints.tabletMax}) {
        display: none;
    }
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

    const [ showFilter, toggleShowFilter ] = useToggle();
    const [ sortBy, setSortBy ] = useState(sortByOptions[0]);

    const animeSorted = [ ...anime ].sort(sortByComparators.get(sortBy));

    return (
        <>
            <SEO title={series.name}/>
            <Text variant="h1">{series.name}</Text>
            <SidebarContainer>
                <StyledDesktopOnly>
                    <MultiCoverImage resourcesWithImages={anime}/>
                </StyledDesktopOnly>
                <Column style={{ "--gap": "24px" }}>
                    <Row style={{ "--justify-content": "space-between", "--align-items": "center" }}>
                        <Text variant="h2">
                            Anime
                            <Text color="text-disabled"> ({anime.length})</Text>
                        </Text>
                        <FilterToggleButton onClick={toggleShowFilter}/>
                    </Row>
                    <Collapse collapse={!showFilter}>
                        <SearchFilterGroup>
                            <SearchFilterSortBy
                                options={sortByOptions}
                                value={sortBy}
                                setValue={setSortBy}
                            />
                        </SearchFilterGroup>
                    </Collapse>
                    <Column style={{ "--gap": "16px" }}>
                        {animeSorted.map((anime) => (
                            <AnimeSummaryCard key={anime.slug} anime={anime}/>
                        ))}
                    </Column>
                </Column>
            </SidebarContainer>
        </>
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
