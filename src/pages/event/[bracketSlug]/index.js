import styled from "styled-components";
import { SEO } from "components/seo";
import { Text } from "components/text";
import { Column, Solid } from "components/box";
import { faStopwatch } from "@fortawesome/pro-solid-svg-icons";
import theme from "theme";
import { useState } from "react";
import { Switcher } from "components/switcher";
import { fetchData } from "lib/server";
import getSharedPageProps from "utils/getSharedPageProps";
import fetchStaticPaths from "utils/fetchStaticPaths";
import gql from "graphql-tag";
import { CornerIcon } from "components/icon/CornerIcon";
import { BracketThemeSummaryCard } from "components/bracket/BracketThemeSummaryCard";
import { BracketChart } from "components/bracket/BracketChart";

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

export default function BracketPage({ bracket }) {
    return (
        <>
            <SEO title={bracket.name} />
            <Text variant="h1">{bracket.name}</Text>
            <BracketChart bracket={bracket}/>
            {!!bracket.currentRound && (
                <BracketRound round={bracket.currentRound} initialGroup={String(bracket.currentGroup)} isCurrent/>
            )}
            {bracket.rounds.sort((a, b) => a.tier - b.tier).map((round) => <BracketRound key={round.tier} round={round}/>)}
        </>
    );
}

function BracketRound({ round, isCurrent = false, initialGroup = "0" }) {
    const hasGroups = !round.name;
    const [ currentGroup, setCurrentGroup ] = useState(initialGroup);

    if (!round.pairings || !round.pairings.length) {
        return null;
    } else if (hasGroups) {
        const groups = round.pairings.reduce((groups, pairing) => {
            if (!groups[pairing.group]) {
                groups[pairing.group] = [];
            }
            groups[pairing.group].push(pairing);
            return groups;
        }, []);

        if (!groups[currentGroup] || !groups[currentGroup].length) {
            return null;
        }

        const content = (
            <>
                <Text variant="h2">{isCurrent && "Current Vote: "}Round {round.tier}</Text>
                <StyledHeader>
                    <Text variant="h3">Group {String.fromCharCode(65 + parseInt(currentGroup))}</Text>
                    <Switcher selectedItem={currentGroup} onChange={setCurrentGroup}>
                        {groups.map((_, index) => (
                            <Switcher.Option key={index} value={String(index)}>{String.fromCharCode(65 + index)}</Switcher.Option>
                        ))}
                    </Switcher>
                </StyledHeader>
                <BracketPairings key={currentGroup} pairings={groups[currentGroup]}/>
            </>
        );

        if (isCurrent) {
            return (
                <CurrentRound>
                    <CornerIcon icon={faStopwatch}/>
                    <Column style={{ "--gap": "24px" }}>
                        {content}
                    </Column>
                </CurrentRound>
            );
        }

        return content;
    }

    return (
        <>
            <Text variant="h2">{round.name}</Text>
            <BracketPairings pairings={round.pairings}/>
        </>
    );
}

function BracketPairings({ pairings }) {
    return pairings.sort((a, b) => a.order - b.order).map((pairing, index) => (
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
}

function ContestantCard({ contestant, opponent, contestantVotes, opponentVotes }) {
    const isVoted = !!contestantVotes;
    const isWinner = isVoted && (contestantVotes !== opponentVotes ? contestantVotes > opponentVotes : contestant.seed < opponent.seed);

    return (
        <BracketThemeSummaryCard
            contestant={contestant}
            isVoted={isVoted}
            isWinner={isWinner}
            seed={contestant.seed}
            votes={contestantVotes}
        />
    );
}

export async function getStaticProps({ params: { bracketSlug } }) {
    const { data, apiRequests } = await fetchData(`
        #graphql
        
        fragment CharacterFragment on BracketCharacter {
            id
            seed
            name
            source
            theme {
                id
                slug
                anime {
                    slug
                    name
                    images {
                        facet
                        link
                    }
                }
                song {
                    title
                    performances {
                        artist {
                            slug
                            name
                        }
                        as
                    }
                }
                slug
                entries {
                    version
                    videos {
                        tags
                    }
                }
            }
        }
    
        fragment RoundFragment on BracketRound {
            tier
            name
            pairings {
                order
                group
                characterA {
                    ...CharacterFragment
                }
                characterB {
                    ...CharacterFragment
                }
                votesA
                votesB
            }
        }
    
        query($bracketSlug: String!) {
            bracket(slug: $bracketSlug) {
                name
                currentRound {
                    ...RoundFragment
                }
                currentGroup
                rounds {
                    ...RoundFragment
                }
            }
        }
    `, {
        bracketSlug
    });

    if (!data.bracket) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            ...getSharedPageProps(apiRequests),
            bracket: data.bracket
        }
    };
}

export async function getStaticPaths() {
    return fetchStaticPaths(async () => {
        const { data } = await fetchData(gql`
            query {
                bracketAll {
                    slug
                }
            }
        `);

        return data.bracketAll.map((bracket) => ({
            params: {
                bracketSlug: bracket.slug
            }
        }));
    }, true);
}
