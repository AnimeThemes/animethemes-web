import Link from "next/link";
import { Text } from "components/text";
import { Column } from "components/box";
import { SEO } from "components/seo";
import styled from "styled-components";
import { Button } from "components/button";
import { fetchData } from "lib/server";
import { faArrowRight, faAward, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "components/icon";
import theme from "theme";
import getSharedPageProps from "utils/getSharedPageProps";

const BigButton = styled(Button)`
    overflow: hidden;
    border-radius: 8px;
    width: 100%;
    height: 64px;
    justify-content: flex-end;
    text-align: end;
    gap: 8px;
`;

const BigIcon = styled(Icon)`
    margin-right: auto;
    
    font-size: 2em;
    color: ${theme.colors["text-disabled"]};
`;

const StyledEventGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    grid-gap: 16px;
`;

export default function EventPage({ awards, brackets }) {
    return (
        <>
            <SEO title="Events" description="Watch themes featured in awards and brackets."/>
            <Text variant="h1">Events</Text>
            <StyledEventGrid>
                <Column style={{ "--gap": "16px" }}>
                    <Text variant="h2">Awards</Text>
                    {awards.map(({ name, path }) => (
                        <Link key={path} href={path} passHref prefetch={false}>
                            <BigButton forwardedAs="a">
                                <BigIcon icon={faAward}/>
                                <Text>{name}</Text>
                                <Icon icon={faArrowRight} color="text-primary"/>
                            </BigButton>
                        </Link>
                    ))}
                </Column>
                <Column style={{ "--gap": "16px" }}>
                    <Text variant="h2">Brackets</Text>
                    {brackets.map(({ name, path }) => (
                        <Link key={path} href={path} passHref prefetch={false}>
                            <BigButton forwardedAs="a">
                                <BigIcon icon={faTrophy}/>
                                <Text>{name}</Text>
                                <Icon icon={faArrowRight} color="text-primary"/>
                            </BigButton>
                        </Link>
                    ))}
                </Column>
            </StyledEventGrid>
        </>
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
            ...getSharedPageProps(),
            awards,
            brackets
        }
    };
}
