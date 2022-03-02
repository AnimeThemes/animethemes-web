import styled from "styled-components";
import Link from "next/link";
import { SEO } from "components/seo";
import { Text } from "components/text";
import { Column } from "components/box";
import { SummaryCard } from "components/card";
import { faAward, faSeedling, faStopwatch, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "components/icon";
import theme from "theme";
import useImage from "hooks/useImage";
import createVideoSlug from "utils/createVideoSlug";
import { SongTitleWithArtists } from "components/utils";
import { useState } from "react";
import { Switcher } from "components/switcher";
import { fetchData } from "lib/server";

const CornerIcon = styled(Icon).attrs({
    size: "2x"
})`
    position: absolute;
    right: 0;
    top: 0;
    color: ${theme.colors["text-primary"]};
    transform: translate(50%, -33%) rotate(10deg);
`;

const CurrentRound = styled.div`
    position: relative;
    margin: 0 -2rem;
    padding: 2rem;
    border-radius: 0.5rem;
    background-color: ${theme.colors["solid"]};
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
        <ThemeSummaryCard
            theme={contestant.theme}
            isVoted={isVoted}
            isWinner={isWinner}
            seed={contestant.seed}
            votes={contestantVotes}
        />
    );
}

const StyledSummaryCard = styled(SummaryCard)`
    position: relative;
    
    width: 100%;
    padding-inline-end: 24px;
    
    opacity: var(--opacity);
`;

const StyledRank = styled(Text)`
    font-variant-numeric: tabular-nums;
    letter-spacing: 1px;
`;

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
            <Link href={`/anime/${theme.anime.slug}`} passHref>
                <Text as="a" link>{theme.anime.name}</Text>
            </Link>
        </SummaryCard.Description>
    );

    return (
        <StyledSummaryCard
            title={<SongTitleWithArtists song={theme.song} songTitleLinkTo={to}/>}
            description={description}
            image={smallCover}
            to={to}
            style={{ "--opacity": !isVoted || isWinner ? 1 : 0.5 }}
            {...props}
        >
            <Column style={{ "--gap": "8px" }}>
                <Text variant="small" color="text-muted" noWrap title="Seed">
                    <Icon icon={faSeedling}/>
                    <StyledRank> {seed}</StyledRank>
                </Text>
                {isVoted && (
                    <Text variant="small" color={isWinner ? "text-primary" : "text-muted"} noWrap title="Votes">
                        <Icon icon={faUsers}/>
                        <StyledRank> {votes}</StyledRank>
                    </Text>
                )}
            </Column>
            {isWinner && (
                <CornerIcon icon={faAward} title="Winner"/>
            )}
        </StyledSummaryCard>
    );
}

export async function getStaticProps({ params: { bracketSlug } }) {
    const { data } = await fetchData(`
        #graphql
        
        fragment CharacterFragment on BracketCharacter {
            id
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
            bracket: data.bracket
        }
    };
}

export async function getStaticPaths() {
    return {
        paths: [
            {
                params: {
                    bracketSlug: "best-anime-opening-ix-salty-arrow"
                }
            }
        ],
        fallback: false
    };
}
