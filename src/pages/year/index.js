import Link from "next/link";
import styled from "styled-components";
import { Flex } from "components/box";
import { Button } from "components/button";
import { Text } from "components/text";
import { fetchData } from "lib/server";
import { SEO } from "components/seo";

const StyledYearPage = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
    grid-auto-rows: 8rem;
`;

export default function YearIndexPage({ years }) {
    return (
        <StyledYearPage>
            <SEO title="Browse by Year"/>
            {years.map((year) => (
                <Flex key={year} alignItems="center" justifyContent="center">
                    <Link href={`/year/${year}`} passHref>
                        <Button as="a">
                            <Text variant="h1">{year}</Text>
                        </Button>
                    </Link>
                </Flex>
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
            years: data.yearAll
                .map((year) => year.value)
                .sort((a, b) => b - a)
        },
        revalidate: 60
    };
}
