import Title from "components/text/title";
import Flex from "components/flex";
import React from "react";
import ContainerSidebar from "components/container/sidebar";
import styled from "styled-components";
import {gapsColumn} from "styles/mixins";
import AnimeSearchResultCard from "components/card/searchResult/anime";
import useAniList from "hooks/useAniList";
import {graphql} from "gatsby";

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
        useAniList(series.anime[0]),
        useAniList(series.anime[1]),
        useAniList(series.anime[2]),
        useAniList(series.anime[3])
    ].map((info) => info.image).filter((image) => !!image);

    const sidebar = (
        <Flex gapsColumn="1.5rem">
            <StyledCoverContainer>
                <StyledCoverContainerFlex>
                    {images.map((image) => (
                        <StyledCoverItemContainer>
                            <StyledCover src={image}/>
                        </StyledCoverItemContainer>
                    ))}
                </StyledCoverContainerFlex>
            </StyledCoverContainer>
        </Flex>
    );

    return (
        <StyledSeriesPage>
            <Title>{series.name}</Title>
            <ContainerSidebar sidebar={sidebar}>
                <Flex gapsColumn="1rem">
                    <Title variant="section">Anime</Title>
                    {series.anime.map((anime) => (
                        <AnimeSearchResultCard anime={anime}/>
                    ))}
                </Flex>
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
`;
