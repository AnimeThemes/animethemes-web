import styled from "styled-components";
import { Text } from "components/text";
import { faDiagramProject } from "@fortawesome/pro-solid-svg-icons";
import { Icon } from "components/icon";
import type { RefObject } from "react";
import { memo, useCallback, useRef, useState } from "react";
import theme from "theme";
import { m } from "framer-motion";
import { Button } from "components/button";
import { BracketThemeSummaryCard } from "components/bracket/BracketThemeSummaryCard";
import type { BracketPageQuery } from "generated/graphql";
import type { RequiredNonNullable } from "utils/types";

const StyledBracketContainer = styled.div`
    flex: 1 1 0;

    overflow: hidden;
    user-select: none;
    
    cursor: grab;
    
    &:active {
        cursor: grabbing;
    }
    
    &:fullscreen {
        background-color: ${theme.colors["background"]};
    }
`;

const StyledBracket = styled(m.div)`
    display: flex;
    position: relative;
    
    width: min-content;
    gap: 128px;
    padding: 16px;
`;

const StyledCanvas = styled.canvas`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
`;

const StyledRound = styled.div`
    display: flex;
    flex-direction: column;
    gap: 64px;
`;

const StyledPairing = styled.div`
    flex: 1;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
`;

const StyledBracketThemeSummaryCard = styled(BracketThemeSummaryCard)`
    width: 384px;
`;

interface BracketChartProps extends RequiredNonNullable<BracketPageQuery> {}

export function BracketChart({ bracket }: BracketChartProps) {
    const [showBracketChart, setShowBracketChart] = useState(false);
    const bracketRef = useRef<HTMLDivElement>();

    const onBracketInit = useCallback((bracket: HTMLDivElement) => {
        bracketRef.current = bracket;

        if (bracket) {
            bracket.requestFullscreen();

            bracket.addEventListener("fullscreenchange", onFullscreenChange);
        }

        function onFullscreenChange() {
            if (!document.fullscreenElement) {
                setShowBracketChart(false);
                bracket.removeEventListener("fullscreenchange", onFullscreenChange);
            }
        }
    }, []);

    const onCanvasInit = useCallback((canvas: HTMLCanvasElement) => {
        if (!canvas?.parentNode) {
            return;
        }

        const parentRect = (canvas.parentNode as HTMLDivElement).getBoundingClientRect();

        canvas.width = parentRect.width;
        canvas.height = parentRect.height;

        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        ctx.strokeStyle = "#75ead4";
        ctx.lineWidth = 2;
        ctx.translate(-parentRect.left, -parentRect.top);

        const cards = document.querySelectorAll<HTMLDivElement>("[data-theme]");
        const cardsById = [...cards].reduce<Record<string, Array<HTMLDivElement>>>((map, card) => {
            const id = card.dataset.theme;
            if (id) {
                if (!map[id]) {
                    map[id] = [];
                }
                map[id].push(card);
            }
            return map;
        }, {});

        for (const cards of Object.values(cardsById)) {
            for (let i = 0; i < cards.length - 1; i++) {
                const current = cards[i];
                const currentRect = current.getBoundingClientRect();
                const next = cards[i + 1];
                const nextRect = next.getBoundingClientRect();
                ctx.beginPath();
                ctx.moveTo(currentRect.left + currentRect.width, currentRect.top + currentRect.height / 2);
                ctx.bezierCurveTo(
                    nextRect.left - (nextRect.left - (currentRect.left + currentRect.width)) / 2,
                    currentRect.top + currentRect.height / 2,
                    nextRect.left - (nextRect.left - (currentRect.left + currentRect.width)) / 2,
                    nextRect.top + nextRect.height / 2,
                    nextRect.left,
                    nextRect.top + nextRect.height / 2
                );
                ctx.stroke();
            }
        }
    }, []);

    return (
        <>
            <Button variant="primary" onClick={() => setShowBracketChart(true)} style={{ "--gap": "8px" }}>
                <Icon icon={faDiagramProject}/>
                <span>Open Bracket Chart</span>
            </Button>
            {showBracketChart ? (
                <StyledBracketContainer ref={onBracketInit}>
                    <StyledBracket drag dragConstraints={bracketRef as RefObject<HTMLDivElement>}>
                        <StyledCanvas ref={onCanvasInit}/>
                        {bracket.rounds.sort((a, b) => a.tier - b.tier).map((round) => (
                            <BracketRound key={round.tier} round={round}/>
                        ))}
                    </StyledBracket>
                </StyledBracketContainer>
            ) : null}
        </>
    );
}

interface BracketRoundProps {
    round: BracketChartProps["bracket"]["rounds"][number]
}

const BracketRound = memo(function BracketRound({ round }: BracketRoundProps) {
    if (!round.pairings || !round.pairings.length) {
        return null;
    }

    return (
        <StyledRound>
            <Text>{round.name}</Text>
            <BracketPairings pairings={round.pairings}/>
        </StyledRound>
    );
});

interface BracketPairingsProps {
    pairings: BracketRoundProps["round"]["pairings"]
}

function BracketPairings({ pairings }: BracketPairingsProps) {
    const sortedPairings = pairings.sort((a, b) => (a.group - b.group) || (a.order - b.order)).map((pairing, index) => (
        <StyledPairing key={index}>
            <ContestantCard
                key={pairing.characterA.id}
                contestant={pairing.characterA}
                opponent={pairing.characterB}
                contestantVotes={pairing.votesA}
                opponentVotes={pairing.votesB}
            />
            <Text variant="small">VS</Text>
            <ContestantCard
                key={pairing.characterB.id}
                contestant={pairing.characterB}
                opponent={pairing.characterA}
                contestantVotes={pairing.votesB}
                opponentVotes={pairing.votesA}
            />
        </StyledPairing>
    ));

    return <>{sortedPairings}</>;
}

interface ContestantCardProps {
    contestant: BracketPairingsProps["pairings"][number]["characterA"] | BracketPairingsProps["pairings"][number]["characterB"]
    opponent: BracketPairingsProps["pairings"][number]["characterA"] | BracketPairingsProps["pairings"][number]["characterB"]
    contestantVotes: number | null
    opponentVotes: number | null
}

function ContestantCard({ contestant, opponent, contestantVotes, opponentVotes }: ContestantCardProps) {
    const isVoted = !!contestantVotes && !!opponentVotes;
    const isWinner = isVoted && (contestantVotes !== opponentVotes ? contestantVotes > opponentVotes : contestant.seed < opponent.seed);

    return (
        <StyledBracketThemeSummaryCard
            contestant={contestant}
            isVoted={isVoted}
            isWinner={isWinner}
            seed={contestant.seed}
            votes={contestantVotes}
            data-theme={contestant.id}
        />
    );
}
