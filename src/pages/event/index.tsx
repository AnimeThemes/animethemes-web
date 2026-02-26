import styled from "styled-components";
import type { GetStaticProps } from "next";
import Link from "next/link";

import { faArrowRight, faAward, faTrophy } from "@fortawesome/free-solid-svg-icons";

import { Column } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { Icon } from "@/components/icon/Icon";
import { SEO } from "@/components/seo/SEO";
import { Text } from "@/components/text/Text";
import { getAvailableBrackets } from "@/lib/server/animebracket";
import theme from "@/theme";
import getSharedPageProps from "@/utils/getSharedPageProps";

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

interface EventPageProps {
    awards: Array<{
        slug: string;
        name: string;
    }>;
    brackets: Array<{
        slug: string;
        name: string;
    }>;
}

export default function EventPage({ awards, brackets }: EventPageProps) {
    return (
        <>
            <SEO title="Events" description="Watch themes featured in awards and brackets." />
            <Text variant="h1">Events</Text>
            <StyledEventList>
                <Column style={{ "--gap": "16px" }}>
                    <Text variant="h2">Awards</Text>
                    {awards.map(({ name, slug }) => (
                        <BigButton key={slug} asChild>
                            <Link href={`/event/${slug}`}>
                                <BigIcon icon={faAward} />
                                <StyledEventName>{name}</StyledEventName>
                                <Icon icon={faArrowRight} color="text-primary" />
                            </Link>
                        </BigButton>
                    ))}
                </Column>
                <Column style={{ "--gap": "16px" }}>
                    <Text variant="h2">Brackets</Text>
                    {brackets.map(({ name, slug }) => (
                        <BigButton key={slug} asChild>
                            <Link href={`/event/${slug}`}>
                                <BigIcon icon={faTrophy} />
                                <StyledEventName>{name}</StyledEventName>
                                <Icon icon={faArrowRight} color="text-primary" />
                            </Link>
                        </BigButton>
                    ))}
                </Column>
            </StyledEventList>
        </>
    );
}

export const getStaticProps: GetStaticProps<EventPageProps> = async () => {
    const brackets = getAvailableBrackets();

    const awards = [
        {
            slug: "anime-awards",
            name: "/r/anime Awards",
        },
    ];

    return {
        props: {
            ...getSharedPageProps(),
            brackets,
            awards,
        },
    };
};
