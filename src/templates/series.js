import Title from "components/text/title";
import React from "react";
import ContainerSidebar from "components/container/sidebar";
import styled from "styled-components";
import { gapsColumn } from "styles/mixins";
import AnimeSearchResultCard from "components/card/searchResult/anime";
import SEO from "components/seo";
import { graphql } from "gatsby";
import useImage from "hooks/useImage";
import { Box } from "components/flex";

const StyledSeriesPage = styled.div`
    ${gapsColumn("1.5rem")}
`;
const StyledCoverContainer = styled.div`        
    position: relative;
    width: 100%;
    padding-top: 150%;
`;
const StyledCoverContainerFlex = styled.div`
    display: flex;
    flex-direction: row;

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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

export default function SeriesDetailPage({ data: { series } }) {
    const images = [
        useImage(series.anime[0]),
        useImage(series.anime[1]),
        useImage(series.anime[2]),
        useImage(series.anime[3])
    ].map((images) => images.largeCover).filter((image) => !!image);

    const sidebar = (
        <Box gapsColumn="1.5rem">
            <StyledCoverContainer>
                <StyledCoverContainerFlex>
                    {images.map((image) => (
                        <StyledCoverItemContainer key={image}>
                            <StyledCover src={image}/>
                        </StyledCoverItemContainer>
                    ))}
                </StyledCoverContainerFlex>
            </StyledCoverContainer>
        </Box>
    );

    return (
        <StyledSeriesPage>
            <SEO title={series.name} />
            <Title>{series.name}</Title>
            <ContainerSidebar sidebar={sidebar}>
                <Box gapsColumn="1rem">
                    <Title variant="section">Anime</Title>
                    {series.anime.map((anime) => (
                        <AnimeSearchResultCard key={anime.slug} anime={anime}/>
                    ))}
                </Box>
            </ContainerSidebar>
        </StyledSeriesPage>
    );
}

export const query = graphql`
    query($slug: String!) {
        series(slug: { eq: $slug }) {
            slug
            name
            anime {
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
