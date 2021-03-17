import { SidebarContainer } from "components/container";
import styled from "styled-components";
import { AnimeSummaryCard } from "components/card";
import { SEO } from "components/seo";
import { graphql } from "gatsby";
import useImage from "hooks/useImage";
import { Box } from "components/box";
import { Text } from "components/text";
import { AspectRatio } from "components/utils";

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

export default function SeriesDetailPage({ data: { series } }) {
    const images = [
        useImage(series.anime[0]),
        useImage(series.anime[1]),
        useImage(series.anime[2]),
        useImage(series.anime[3])
    ].map((images) => images.largeCover).filter((image) => !!image);

    return (
        <Box gapsColumn="1.5rem">
            <SEO title={series.name} />
            <Text variant="h1">{series.name}</Text>
            <SidebarContainer>
                <Box gapsColumn="1.5rem">
                    <AspectRatio ratio={1 / 2}>
                        <StyledCoverContainer>
                            {images.map((image) => (
                                <StyledCoverItemContainer key={image}>
                                    <StyledCover src={image}/>
                                </StyledCoverItemContainer>
                            ))}
                        </StyledCoverContainer>
                    </AspectRatio>
                </Box>
                <Box gapsColumn="1rem">
                    <Text variant="h2">Anime</Text>
                    {series.anime.map((anime) => (
                        <AnimeSummaryCard key={anime.slug} anime={anime}/>
                    ))}
                </Box>
            </SidebarContainer>
        </Box>
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
