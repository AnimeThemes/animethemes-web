import styled from "styled-components";
import type { GetStaticProps } from "next";
import getSharedPageProps from "utils/getSharedPageProps";
import { Row } from "components/box";
import { FeaturedTheme } from "components/featured-theme";
import { fetchData } from "lib/server";
import type { LandingPageQuery } from "generated/graphql";
import gql from "graphql-tag";
import serializeMarkdown from "utils/serializeMarkdown";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

const StyledSection = styled.section`
    min-height: 100dvh;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    padding: 64px;
`;

const StyledHeadline = styled.h1`
    font-size: 4rem;
    line-height: 1.25;
`;

const StyledHighlight = styled.span`
    font-size: 6rem;
    font-weight: 850;
    
    background-image: linear-gradient(135deg, rgba(166,125,252,1) 0%, rgba(131,185,255,1) 50%, rgba(127,251,231,1) 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

interface LandingPageProps {
    featuredTheme: NonNullable<LandingPageQuery["featuredTheme"]>["theme"] | null;
    announcementSources: MDXRemoteSerializeResult[]
}

export default function LandingPage() {
    return (
        <StyledSection>
            <Row style={{ "--justify-content": "space-between" }}>
                <StyledHeadline>Welcome to, <br /><StyledHighlight>AnimeThemes</StyledHighlight></StyledHeadline>
            </Row>
        </StyledSection>
    );
}

export const getStaticProps: GetStaticProps<LandingPageProps> = async () => {
    const { data, apiRequests } = await fetchData<LandingPageQuery>(gql`
        ${FeaturedTheme.fragments.theme}

        query LandingPage {
            featuredTheme {
                theme {
                    ...FeaturedThemeTheme
                }
            }
            announcementAll {
                content
            }
        }
    `);

    return {
        props: {
            ...getSharedPageProps(apiRequests),
            featuredTheme: data?.featuredTheme?.theme ?? null,
            announcementSources: await Promise.all(
                data?.announcementAll.map(async (announcement) => (await serializeMarkdown(announcement.content)).source)
            ),
            isFullWidthPage: true,
        },
    };
};
