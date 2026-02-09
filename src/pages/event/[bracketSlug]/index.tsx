import { useState } from "react";
import styled from "styled-components";
import type { GetStaticPaths, GetStaticProps } from "next";

import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import type { ParsedUrlQuery } from "querystring";

import { Column } from "@/components/box/Flex";
import { Solid } from "@/components/box/Solid";
import { BracketChart } from "@/components/bracket/BracketChart";
import {
    type BracketCharacterWithTheme,
    type BracketPairingWithThemes,
    type BracketRoundWithThemes,
    BracketThemeSummaryCard,
    type BracketWithThemes,
} from "@/components/bracket/BracketThemeSummaryCard";
import { CornerIcon } from "@/components/icon/CornerIcon";
import { SEO } from "@/components/seo/SEO";
import { Switcher, SwitcherOption } from "@/components/switcher/Switcher";
import { Text } from "@/components/text/Text";
import createApolloClient from "@/graphql/createApolloClient";
import { graphql } from "@/graphql/generated";
import { type BracketRound, fetchBracket, getAvailableBrackets } from "@/lib/server/animebracket";
import theme from "@/theme";
import fetchStaticPaths from "@/utils/fetchStaticPaths";
import type { SharedPageProps } from "@/utils/getSharedPageProps";
import getSharedPageProps from "@/utils/getSharedPageProps";

const CurrentRound = styled(Solid)`
    position: relative;
    margin: 0 -2rem;
    padding: 2rem;
    border-radius: 0.5rem;
`;

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledBracketPairing = styled.div`
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    justify-items: center;
    align-items: center;
    grid-gap: 16px 32px;

    @media (max-width: ${theme.breakpoints.mobileMax}) {
        grid-template-columns: 1fr;
    }
`;

interface BracketPageProps extends SharedPageProps {
    bracket: BracketWithThemes;
}

interface BracketPageParams extends ParsedUrlQuery {
    bracketSlug: string;
}

export default function BracketPage({ bracket }: BracketPageProps) {
    return (
        <>
            <SEO title={bracket.name} />
            <Text variant="h1">{bracket.name}</Text>
            <BracketChart bracket={bracket} />
            {!!bracket.currentRound && (
                <BracketRound round={bracket.currentRound} initialGroup={bracket.currentGroup ?? undefined} isCurrent />
            )}
            {bracket.rounds
                .sort((a, b) => a.tier - b.tier)
                .map((round) => (
                    <BracketRound key={round.tier} round={round} />
                ))}
        </>
    );
}

interface BracketRoundProps {
    round: BracketRoundWithThemes;
    isCurrent?: boolean;
    initialGroup?: number;
}

function BracketRound({ round, isCurrent = false, initialGroup = 0 }: BracketRoundProps) {
    const hasGroups = !round.name;
    const [currentGroup, setCurrentGroup] = useState(initialGroup);

    let content;

    if (!round.pairings || !round.pairings.length) {
        return null;
    } else if (hasGroups) {
        const groups = round.pairings.reduce<Array<Array<(typeof round.pairings)[number]>>>((groups, pairing) => {
            if (!groups[pairing.group]) {
                groups[pairing.group] = [];
            }
            groups[pairing.group].push(pairing);
            return groups;
        }, []);

        if (!groups[currentGroup] || !groups[currentGroup].length) {
            return null;
        }

        content = (
            <>
                <Text variant="h2">
                    {isCurrent && "Current Vote: "}Round {round.tier}
                </Text>
                <StyledHeader>
                    <Text variant="h3">Group {String.fromCharCode(65 + currentGroup)}</Text>
                    <Switcher
                        selectedItem={String(currentGroup)}
                        onChange={(groupAsString: string) => setCurrentGroup(parseInt(groupAsString))}
                    >
                        {groups.map((_, index) => (
                            <SwitcherOption key={index} value={String(index)}>
                                {String.fromCharCode(65 + index)}
                            </SwitcherOption>
                        ))}
                    </Switcher>
                </StyledHeader>
                <BracketPairings key={currentGroup} pairings={groups[currentGroup]} />
            </>
        );
    } else {
        content = (
            <>
                <Text variant="h2">{round.name}</Text>
                <BracketPairings pairings={round.pairings} />
            </>
        );
    }

    if (isCurrent) {
        return (
            <CurrentRound>
                <CornerIcon icon={faStopwatch} />
                <Column style={{ "--gap": "24px" }}>{content}</Column>
            </CurrentRound>
        );
    }

    return content;
}

interface BracketPairingsProps {
    pairings: Array<BracketPairingWithThemes>;
}

function BracketPairings({ pairings }: BracketPairingsProps) {
    const items = pairings
        .sort((a, b) => a.order - b.order)
        .map((pairing, index) => (
            <StyledBracketPairing key={index}>
                <ContestantCard
                    key={pairing.characterA.id}
                    contestant={pairing.characterA}
                    opponent={pairing.characterB}
                    contestantVotes={pairing.votesA}
                    opponentVotes={pairing.votesB}
                />
                <Text variant="small">VS</Text>
                <ContestantCard
                    key={pairing.characterA.id}
                    contestant={pairing.characterB}
                    opponent={pairing.characterA}
                    contestantVotes={pairing.votesB}
                    opponentVotes={pairing.votesA}
                />
            </StyledBracketPairing>
        ));

    return <>{items}</>;
}

interface ContestantCardProps {
    contestant: BracketCharacterWithTheme;
    opponent: BracketCharacterWithTheme;
    contestantVotes: number | null;
    opponentVotes: number | null;
}

function ContestantCard({ contestant, opponent, contestantVotes, opponentVotes }: ContestantCardProps) {
    const isVoted = !!contestantVotes && !!opponentVotes;
    const isWinner =
        isVoted &&
        (contestantVotes !== opponentVotes ? contestantVotes > opponentVotes : contestant.seed < opponent.seed);

    return (
        <BracketThemeSummaryCard
            character={contestant}
            isVoted={isVoted}
            isWinner={isWinner}
            seed={contestant.seed}
            votes={contestantVotes}
        />
    );
}

export const getStaticProps: GetStaticProps<BracketPageProps, BracketPageParams> = async ({ params }) => {
    if (params === undefined) {
        return { notFound: true };
    }

    const bracket = await fetchBracket(params.bracketSlug);

    if (bracket === null) {
        return { notFound: true };
    }

    const themeIds = new Set(
        bracket.rounds
            .flatMap((round) => round.pairings)
            .flatMap((pairing) => [pairing.characterA.themeId, pairing.characterB.themeId])
            .filter((themeId) => themeId !== null),
    );

    const client = createApolloClient();

    const { data } = await client.query({
        query: graphql(`
            query BracketPage($themeIds: [Int!]!) {
                animethemePagination(id_in: $themeIds) {
                    data {
                        id
                        ...BracketThemeSummaryCardTheme
                    }
                }
            }
        `),
        variables: {
            themeIds: [...themeIds],
        },
    });

    const themesById = new Map(data.animethemePagination.data.map((theme) => [theme.id, theme]));

    function populateRound(round: BracketRound): BracketRoundWithThemes {
        return {
            ...round,
            pairings: round.pairings.map((pairing) => ({
                ...pairing,
                characterA: {
                    ...pairing.characterA,
                    theme: (pairing.characterA.themeId && themesById.get(pairing.characterA.themeId)) || null,
                },
                characterB: {
                    ...pairing.characterB,
                    theme: (pairing.characterB.themeId && themesById.get(pairing.characterB.themeId)) || null,
                },
            })),
        };
    }

    const bracketPopulated = {
        ...bracket,
        currentRound: bracket.currentRound && populateRound(bracket.currentRound),
        rounds: bracket.rounds.map(populateRound),
    };

    return {
        props: {
            ...getSharedPageProps(),
            bracket: bracketPopulated,
        },
    };
};

export const getStaticPaths: GetStaticPaths<BracketPageParams> = async () => {
    return fetchStaticPaths(async () => {
        const brackets = getAvailableBrackets();

        return brackets.map((bracket) => ({
            params: {
                bracketSlug: bracket.slug,
            },
        }));
    });
};
