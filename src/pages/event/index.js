import Link from "next/link";
import { Text } from "components/text";
import { Box, Grid } from "components/box";
import { SEO } from "components/seo";
import styled from "styled-components";
import { Button } from "components/button";
import { fetchData } from "lib/server";
import { faArrowRight, faAward, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "components/icon";
import theme from "theme";

const BigButton = styled(Button)`
    overflow: hidden;
    border-radius: 0.5rem;
    width: 100%;
    height: 4rem;
    justify-content: flex-end;
    text-align: end;
    gap: 0.5rem;
`;
const BigIcon = styled(Icon).attrs({
    size: "2x"
})`
    margin-right: auto;
    
    color: ${theme.colors["text-disabled"]};
`;

export default function EventPage({ awards, brackets }) {
    return (
        <Box gapsColumn="1.5rem">
            <SEO title="Events" description="Watch themes featured in awards and brackets."/>
            <Text variant="h1">Events</Text>
            <Grid gridTemplateColumns={[ "1fr", "1fr 1fr" ]} gridGap="1rem">
                <Box gapsColumn="1rem">
                    <Text variant="h2">Awards</Text>
                    {awards.map(({ name, path }) => (
                        <Link key={path} href={path} passHref>
                            <BigButton as="a">
                                <BigIcon icon={faAward}/>
                                <Text>{name}</Text>
                                <Icon icon={faArrowRight} color="text-primary"/>
                            </BigButton>
                        </Link>
                    ))}

                </Box>
                <Box gapsColumn="1rem">
                    <Text variant="h2">Brackets</Text>
                    {brackets.map(({ name, path }) => (
                        <Link key={path} href={path} passHref>
                            <BigButton as="a">
                                <BigIcon icon={faTrophy}/>
                                <Text>{name}</Text>
                                <Icon icon={faArrowRight} color="text-primary"/>
                            </BigButton>
                        </Link>
                    ))}
                </Box>
            </Grid>
        </Box>
    );
}

export async function getStaticProps() {
    const awards = [
        {
            name: "/r/anime Awards",
            path: "/event/anime-awards"
        }
    ];

    const brackets = await Promise.all([
        "best-anime-opening-ix-salty-arrow"
    ].map(async (bracket) => {
        const { data } = await fetchData(`
            #graphql

            query($bracketSlug: String!) {
                bracket(slug: $bracketSlug) {
                    name
                }
            }
        `, { bracketSlug: bracket });

        return {
            name: data.bracket.name,
            path: `/event/${bracket}`
        };
    }));

    return {
        props: {
            awards,
            brackets
        }
    };
}
