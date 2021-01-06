import React from "react";
import {graphql} from "gatsby";
import styled from "styled-components";
import AnimeSearchResultCard from "components/card/searchResult/anime";
import Title from "components/text/title";
import {gapsColumn} from "styles/mixins";
import SEO from "components/seo";
import YearNavigation from "components/navigation/year";
import SeasonNavigation from "components/navigation/season";

const StyledPage = styled.div`
    ${gapsColumn()}
`;

export default function SeasonDetailPage({ data: { allAnime }, pageContext: { year, season, seasonList } }) {
    const pageTitle = `${season} ${year} Anime`;
    const animeList = allAnime.nodes;

    return (
        <StyledPage>
            <SEO title={pageTitle} />
            <YearNavigation year={year} />
            <SeasonNavigation year={year} season={season} seasonList={seasonList} />
            <Title variant="section">{`Anime from ${season} of ${year}`}</Title>
            {animeList.map((anime) => (
                <AnimeSearchResultCard key={anime.slug} anime={anime}/>
            ))}
        </StyledPage>
    );
}

export const query = graphql`
    query($year: Int!, $season: String) {
        allAnime(filter: {year: {eq: $year}, season: {eq: $season}}) {
            nodes {
                slug
                name
                themes {
                    slug
                    ...VideoSlug
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
    }
`;
