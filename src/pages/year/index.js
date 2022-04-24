import Link from "next/link";
import styled from "styled-components";
import { Button } from "components/button";
import { Text } from "components/text";
import { fetchData } from "lib/server";
import { SEO } from "components/seo";
import getSharedPageProps from "utils/getSharedPageProps";

const StyledYearPage = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
    grid-auto-rows: 8rem;
    justify-items: center;
    align-items: center;
`;

export default function YearIndexPage({ years }) {
    return (
        <StyledYearPage>
            <SEO title="Browse by Year"/>
            {years.map((year) => (
                <Link key={year} href={`/year/${year}`} passHref prefetch={false}>
                    <Button as="a">
                        <Text variant="h1">{year}</Text>
                    </Button>
                </Link>
            ))}
        </StyledYearPage>
    );
}

export async function getStaticProps() {
    const { data } = await fetchData(`
        #graphql

        query {
            yearAll {
                value
            }
        }
    `);

    return {
        props: {
            ...getSharedPageProps(),
            years: data.yearAll
                .map((year) => year.value)
                .sort((a, b) => b - a)
        }
    };
}
