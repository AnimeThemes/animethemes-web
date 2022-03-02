import { SidebarContainer } from "components/container";
import styled from "styled-components";
import { AnimeSummaryCard } from "components/card";
import { Column, Row } from "components/box";
import { Text } from "components/text";
import { Collapse } from "components/utils";
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
import { SEO } from "components/seo";
import theme from "theme";
import { MultiCoverImage } from "components/image";

const StyledDesktopOnly = styled.div`    
    @media (max-width: ${theme.breakpoints.tabletMax}) {
        display: none;
    }
`;
const StyledList = styled.div`
    display: flex;
    flex-direction: column;

    gap: 8px;

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

    const [ showFilter, toggleShowFilter ] = useToggle();
    const [ sortBy, setSortBy ] = useState(sortByOptions[0]);

    const animeSorted = [ ...anime ].sort(sortByComparators.get(sortBy));

    return (
        <>
            <SEO title={studio.name}/>
            <Text variant="h1">{studio.name}</Text>
            <SidebarContainer>
                <Column style={{ "--gap": "24px" }}>
                    <StyledDesktopOnly>
                        <MultiCoverImage resourcesWithImages={anime}/>
                    </StyledDesktopOnly>
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
                </Column>
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
