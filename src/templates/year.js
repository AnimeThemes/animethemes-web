import React from "react";
import {graphql} from "gatsby";
import styled from "styled-components";
import AnimeSearchResultCard from "components/card/searchResult/anime";
import Title from "components/text/title";
import {gapsColumn} from "styles/mixins";
import Button from "components/button";
import Flex from "components/flex";
import SEO from "components/seo";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import YearNavigation from "components/navigation/year";
import SeasonNavigation from "components/navigation/season";

const seasonOrder = [ "Winter", "Spring", "Summer", "Fall" ];
const StyledPage = styled.div`
    ${gapsColumn()}
`;

export default function YearDetailPage({ data: { allAnime }, pageContext: { year, seasonList } }) {
    const pageTitle = `${year} Anime`;
    const animeBySeason = allAnime.groupedBySeason.sort((a, b) => seasonOrder.indexOf(a.fieldValue) - seasonOrder.indexOf(b.fieldValue));

    return (
        <StyledPage>
            <SEO title={pageTitle} />
            <YearNavigation year={year} />
            <SeasonNavigation year={year} seasonList={seasonList} />
            {animeBySeason.map(({ fieldValue: season, nodes: animeList }) => (
                <SeasonPreview key={season} season={season} year={year} animeList={animeList}/>
            ))}
        </StyledPage>
    );
}

function SeasonPreview({ season, year, animeList }) {
    return (
        <>
            <Title variant="section">{season}</Title>
            {animeList.map((anime) => (
                <AnimeSearchResultCard key={anime.slug} anime={anime}/>
            ))}
            <Flex row justifyContent="center">
                <Button to={`/year/${year}/${season.toLowerCase()}`} icon>
                    <FontAwesomeIcon icon={faChevronDown} fixedWidth/>
                </Button>
            </Flex>
        </>
    );
}

export const query = graphql`
    query($year: Int!) {
        allAnime(filter: { year: { eq: $year } }) {
            groupedBySeason: group(field: season, limit: 3) {
                fieldValue
                nodes {
                    slug
                    name
                    themes {
                        slug
                        entries {
                            videos {
                                filename
                            }
                        }
                    }
                    resources {
                        link
                        site
                    }
                }
            }
        }
    }
`;
