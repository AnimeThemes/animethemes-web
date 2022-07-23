import Link from "next/link";
import { Text } from "components/text";
import { Column } from "components/box";
import { SEO } from "components/seo";
import styled from "styled-components";
import { Button } from "components/button";
import { fetchData } from "lib/server";
import { faArrowRight, faAward, faTrophy } from "@fortawesome/pro-solid-svg-icons";
import { Icon } from "components/icon";
import theme from "theme";
import getSharedPageProps from "utils/getSharedPageProps";
import gql from "graphql-tag";
import { EventPageQuery } from "generated/graphql";

const BigButton = styled(Button)`
    overflow: hidden;
    border-radius: ${theme.scalars.borderRadiusCard};
    width: 100%;
    height: 48px;
    justify-content: flex-end;
    text-align: end;
    gap: 16px;
`;

const BigIcon = styled(Icon)`    
    font-size: 1.5em;
    color: ${theme.colors["text-disabled"]};
`;

const StyledEventList = styled.div`
    display: flex;
    flex-direction: column;
    grid-gap: 16px;
`;

const StyledEventName = styled(Text)`
    margin-right: auto;
`;

interface EventPageProps extends EventPageQuery {
    awardAll: Array<{
        slug: string
        name: string
    }>
}

export default function EventPage({ awardAll, bracketAll }: EventPageProps) {
    return <>
        <SEO title="Events" description="Watch themes featured in awards and brackets."/>
        <Text variant="h1">Events</Text>
        <StyledEventList>
            <Column style={{ "--gap": "16px" }}>
                <Text variant="h2">Awards</Text>
                {awardAll.map(({ name, slug }) => (
                    <Link
                        key={slug}
                        href={`/event/${slug}`}
                        passHref
                        legacyBehavior>
                        <BigButton forwardedAs="a">
                            <BigIcon icon={faAward}/>
                            <StyledEventName>{name}</StyledEventName>
                            <Icon icon={faArrowRight} color="text-primary"/>
                        </BigButton>
                    </Link>
                ))}
            </Column>
            <Column style={{ "--gap": "16px" }}>
                <Text variant="h2">Brackets</Text>
                {bracketAll.map(({ name, slug }) => (
                    <Link
                        key={slug}
                        href={`/event/${slug}`}
                        passHref
                        legacyBehavior>
                        <BigButton forwardedAs="a">
                            <BigIcon icon={faTrophy}/>
                            <StyledEventName>{name}</StyledEventName>
                            <Icon icon={faArrowRight} color="text-primary"/>
                        </BigButton>
                    </Link>
                ))}
            </Column>
        </StyledEventList>
    </>;
}

export async function getStaticProps() {
    const { data, apiRequests } = await fetchData<EventPageQuery>(gql`
        query EventPage {
            bracketAll {
                slug
                name
            }
        }
    `);

    const awardAll = [
        {
            slug: "anime-awards",
            name: "/r/anime Awards"
        }
    ];

    return {
        props: {
            ...getSharedPageProps(apiRequests),
            bracketAll: data.bracketAll,
            awardAll
        }
    };
}
