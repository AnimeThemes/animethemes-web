import styled from "styled-components";
import { graphql, Link } from "gatsby";
import { SEO } from "components/seo";
import { Text } from "components/text";
import { Box, Flex } from "components/box";
import { Card, SummaryCard } from "components/card";
import { faAward, faSeedling, faStopwatch, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "components/icon";
import theme from "theme";
import useImage from "hooks/useImage";
import createVideoSlug from "utils/createVideoSlug";
import { SongTitleWithArtists } from "components/utils";
import { useState } from "react";
import { Switcher } from "components/switcher";

const CornerIcon = styled(Icon)`
    position: absolute;
    right: 0;
    top: 0;
    font-size: 2rem;
    color: ${theme.colors["text-primary"]};
    transform: translate(50%, -33%) rotate(10deg);
`;
const CurrentRound = styled(Box)`
    position: relative;
    margin: 0 -2rem;
    padding: 2rem;
    border-radius: 0.5rem;
    background-color: ${theme.colors["solid"]};
`;

export default function BracketPage({ data: { bracket } }) {
    return (
        <Box gapsColumn="1.5rem">
            <SEO title={bracket.name} />
            <Text variant="h1">{bracket.name}</Text>
            <BracketRound round={bracket.currentRound} initialGroup={String(bracket.currentGroup)} isCurrent/>
            {bracket.rounds.sort((a, b) => a.tier - b.tier).map((round) => <BracketRound key={round.tier} round={round}/>)}
        </Box>
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
                <Flex alignItems="center" justifyContent="space-between">
                    <Text variant="h3">Group {String.fromCharCode(65 + parseInt(currentGroup))}</Text>
                    <Switcher
                        items={Object.fromEntries(groups.map((_, index) => [ index, String.fromCharCode(65 + index) ]))}
                        selectedItem={currentGroup}
                        onChange={setCurrentGroup}
                        bg={isCurrent ? "solid-on-card" : "solid"}
                    />
                </Flex>
                <BracketPairings pairings={groups[currentGroup]} isCurrent={isCurrent}/>
            </>
        );

        if (isCurrent) {
            return (
                <CurrentRound>
                    <CornerIcon icon={faStopwatch}/>
                    <Box gapsColumn="1.5rem">
                        {content}
                    </Box>
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

function BracketPairings({ pairings, isCurrent }) {
    return pairings.sort((a, b) => a.order - b.order).map((pairing, index) => (
        <Flex key={index} flexDirection={[ "column", "row" ]} alignItems={[ "stretch", "center" ]}>
            <Box flex="1">
                <ContestantCard
                    contestant={pairing.characterA}
                    opponent={pairing.characterB}
                    contestantVotes={pairing.votesA}
                    opponentVotes={pairing.votesB}
                    isCurrent={isCurrent}
                />
            </Box>
            <Box p="1rem 2rem" alignSelf="center">
                <Text variant="small">VS</Text>
            </Box>
            <Box flex="1">
                <ContestantCard
                    contestant={pairing.characterB}
                    opponent={pairing.characterA}
                    contestantVotes={pairing.votesB}
                    opponentVotes={pairing.votesA}
                    isCurrent={isCurrent}
                />
            </Box>
        </Flex>
    ));
}

function ContestantCard({ contestant, opponent, contestantVotes, opponentVotes, isCurrent }) {
    const isVoted = !!contestantVotes;
    const isWinner = isVoted && (contestantVotes !== opponentVotes ? contestantVotes > opponentVotes : contestant.seed < opponent.seed);

    if (contestant.theme) {
        return (
            <ThemeSummaryCard
                theme={contestant.theme}
                isVoted={isVoted}
                isWinner={isWinner}
                seed={contestant.seed}
                votes={contestantVotes}
                bg={isCurrent ? "solid-on-card" : "solid"}
            />
        );
    }

    return (
        <Card opacity={!isVoted || isWinner ? 1 : 0.5} position="relative" bg={isCurrent ? "solid-on-card" : "solid"}>
            <Flex alignItems="center" justifyContent="space-between" gapsRow="1rem">
                <Text>{contestant.idRaw} &bull; {contestant.name} &bull; {contestant.source}</Text>
                <Flex flexDirection="column" gapsColumn="0.5rem">
                    <Text variant="small" color="text-muted" noWrap title="Seed">
                        <Icon icon={faSeedling}/>
                        <Text tabularNums letterSpacing="1px"> {contestant.seed}</Text>
                    </Text>
                    {isVoted && (
                        <Text variant="small" color={isWinner ? "text-primary" : "text-muted"} noWrap title="Votes">
                            <Icon icon={faUsers}/>
                            <Text tabularNums letterSpacing="1px"> {contestantVotes}</Text>
                        </Text>
                    )}
                </Flex>
            </Flex>
            {isWinner && (
                <CornerIcon icon={faAward} title="Winner"/>
            )}
        </Card>
    );
}

function ThemeSummaryCard({ theme, isVoted, isWinner, seed, votes, ...props }) {
    const { smallCover } = useImage(theme.anime);

    if (!theme.entries.length) {
        return null;
    }

    const entry = theme.entries[0];

    if (!entry.videos.length) {
        return null;
    }

    const video = entry.videos[0];
    const videoSlug = createVideoSlug(theme, entry, video);
    const to = `/anime/${theme.anime.slug}/${videoSlug}`;

    const description = (
        <SummaryCard.Description>
            <span>{theme.slug}</span>
            <Link to={`/anime/${theme.anime.slug}`}>
                <Text link>{theme.anime.name}</Text>
            </Link>
        </SummaryCard.Description>
    );

    return (
        <SummaryCard
            title={<SongTitleWithArtists song={theme.song} songTitleLinkTo={to}/>}
            description={description}
            image={smallCover}
            to={to}
            opacity={!isVoted || isWinner ? 1 : 0.5}
            position="relative"
            pr="1.5rem"
            {...props}
        >
            <Flex flexDirection="column" gapsColumn="0.5rem">
                <Text variant="small" color="text-muted" noWrap title="Seed">
                    <Icon icon={faSeedling}/>
                    <Text tabularNums letterSpacing="1px"> {seed}</Text>
                </Text>
                {isVoted && (
                    <Text variant="small" color={isWinner ? "text-primary" : "text-muted"} noWrap title="Votes">
                        <Icon icon={faUsers}/>
                        <Text tabularNums letterSpacing="1px"> {votes}</Text>
                    </Text>
                )}
            </Flex>
            {isWinner && (
                <Box position="absolute" right="0" top="0">
                    <CornerIcon icon={faAward} title="Winner"/>
                </Box>
            )}
        </SummaryCard>
    );
}

export const query = graphql`
    fragment CharacterFragment on BracketCharacter {
        idRaw
        seed
        name
        source
        theme {
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
            ...VideoSlug
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
    
    query($slug: String!) {
        bracket(slug: { eq: $slug }) {
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
`;
