import styled from "styled-components";
import type { GetStaticProps } from "next";

import gql from "graphql-tag";

import { BackToTopButton } from "@/components/button/BackToTopButton";
import { Card } from "@/components/card/Card";
import { SEO } from "@/components/seo/SEO";
import { Text } from "@/components/text/Text";
import { TextLink } from "@/components/text/TextLink";
import type { YearIndexPageQuery } from "@/generated/graphql";
import { fetchData } from "@/lib/server";
import theme from "@/theme";
import type { SharedPageProps } from "@/utils/getSharedPageProps";
import getSharedPageProps from "@/utils/getSharedPageProps";

const StyledYearGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 16px;
`;

const StyledYear = styled(TextLink)`
    font-size: 1.5rem;
    color: ${theme.colors["text"]}
`;

const StyledSeasonList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 8px 16px;
    margin-top: 8px;
    
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
`;

interface YearIndexPageProps extends SharedPageProps, YearIndexPageQuery {}

export default function YearIndexPage({ yearAll }: YearIndexPageProps) {
    return (
        <>
            <SEO title="Browse by Year"/>
            <BackToTopButton/>
            <Text variant="h1">Year Index</Text>
            <StyledYearGrid>
                {yearAll.map((year) => (
                    <Card key={year.value}>
                        <StyledYear href={`/year/${year.value}`}>{year.value}</StyledYear>
                        <StyledSeasonList>
                            {year.seasons?.map((season) => (
                                <TextLink key={season.value} href={`/year/${year.value}/${season.value}`}>{season.value}</TextLink>
                            )) ?? null}
                        </StyledSeasonList>
                    </Card>
                ))}
            </StyledYearGrid>
        </>
    );
}

export const getStaticProps: GetStaticProps<YearIndexPageProps> = async () => {
    const { data, apiRequests } = await fetchData<YearIndexPageQuery>(gql`
        query YearIndexPage {
            yearAll {
                value
                seasons {
                    value
                }
            }
        }
    `);

    return {
        props: {
            ...getSharedPageProps(apiRequests),
            yearAll: data.yearAll.sort((a, b) => b.value - a.value)
        }
    };
};
