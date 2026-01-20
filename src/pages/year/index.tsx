import styled from "styled-components";
import type { GetStaticProps } from "next";

import type { ResultOf } from "@graphql-typed-document-node/core";

import { BackToTopButton } from "@/components/button/BackToTopButton";
import { Card } from "@/components/card/Card";
import { SEO } from "@/components/seo/SEO";
import { Text } from "@/components/text/Text";
import { TextLink } from "@/components/text/TextLink";
import createApolloClient from "@/graphql/createApolloClient";
import { graphql } from "@/graphql/generated";
import theme from "@/theme";
import { seasonComparator, sortTransformed } from "@/utils/comparators";
import type { SharedPageProps } from "@/utils/getSharedPageProps";
import getSharedPageProps from "@/utils/getSharedPageProps";

const StyledYearGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 16px;
`;

const StyledYear = styled(TextLink)`
    font-size: 1.5rem;
    color: ${theme.colors["text"]};
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

const propsQuery = graphql(`
    query YearIndexPage {
        animeyears {
            year
            seasons {
                season
                seasonLocalized
            }
        }
    }
`);

interface YearIndexPageProps extends SharedPageProps, ResultOf<typeof propsQuery> {}

export default function YearIndexPage({ animeyears }: YearIndexPageProps) {
    return (
        <>
            <SEO title="Browse by Year" />
            <BackToTopButton />
            <Text variant="h1">Year Index</Text>
            <StyledYearGrid>
                {animeyears.map((year) => (
                    <Card key={year.year}>
                        <StyledYear href={`/year/${year.year}`}>{year.year}</StyledYear>
                        <StyledSeasonList>
                            {year.seasons?.map((season) => (
                                <TextLink key={season.season} href={`/year/${year.year}/${season.season}`}>
                                    {season.seasonLocalized}
                                </TextLink>
                            )) ?? null}
                        </StyledSeasonList>
                    </Card>
                ))}
            </StyledYearGrid>
        </>
    );
}

export const getStaticProps: GetStaticProps<YearIndexPageProps> = async () => {
    const client = createApolloClient();

    const { data } = await client.query({
        query: propsQuery,
    });

    return {
        props: {
            ...getSharedPageProps(),
            animeyears: [...data.animeyears]
                .sort((a, b) => b.year - a.year)
                .map((year) => ({
                    ...year,
                    seasons: [...(year.seasons ?? [])].sort(
                        sortTransformed(seasonComparator, (season) => season.season),
                    ),
                })),
        },
    };
};
