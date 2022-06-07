import styled from "styled-components";
import { Text } from "components/text";
import { faDiagramProject } from "@fortawesome/pro-solid-svg-icons";
import { Icon } from "components/icon";
import { memo, useCallback, useRef, useState } from "react";
import theme from "theme";
import { motion } from "framer-motion";
import { Button } from "components/button";
import { BracketThemeSummaryCard } from "components/bracket/BracketThemeSummaryCard";

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

const StyledBracket = styled(motion.div)`
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

export function BracketChart({ bracket }) {
    const [showBracketChart, setShowBracketChart] = useState(false);
    const bracketRef = useRef();

    const onBracketInit = useCallback((bracket) => {
        bracketRef.current = bracket;

        if (bracket) {
            bracket.requestFullscreen();

            bracket.addEventListener("fullscreenchange", onFullscreenChange);

            function onFullscreenChange() {
                if (!document.fullscreenElement) {
                    setShowBracketChart(false);
                    bracket.removeEventListener("fullscreenchange", onFullscreenChange);
                }
            }
        }
    }, []);

    const onCanvasInit = useCallback((canvas) => {
        if (!canvas) {
            return;
        }

        const parentRect = canvas.parentNode.getBoundingClientRect();

        canvas.width = parentRect.width;
        canvas.height = parentRect.height;

        /** @type CanvasRenderingContext2D */
        const ctx = canvas.getContext("2d");

        ctx.strokeStyle = "#75ead4";
        ctx.lineWidth = 2;
        ctx.translate(-parentRect.left, -parentRect.top);

        const cards = document.querySelectorAll("[data-theme]");
        const cardsById = [...cards].reduce((map, card) => {
            const id = card.dataset.theme;
            if (!map[id]) {
                map[id] = [];
            }
            map[id].push(card);
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
                    <StyledBracket drag dragConstraints={bracketRef}>
                        <StyledCanvas ref={onCanvasInit}/>
                        {bracket.rounds.sort((a, b) => a.tier - b.tier).map((round) => <BracketRound key={round.tier} round={round}/>)}
                    </StyledBracket>
                </StyledBracketContainer>
            ) : null}
        </>
    );
}

const BracketRound = memo(function BracketRound({ round }) {
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

function BracketPairings({ pairings }) {
    return pairings.sort((a, b) => (a.group - b.group) || (a.order - b.order)).map((pairing, index) => (
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
}

function ContestantCard({ contestant, opponent, contestantVotes, opponentVotes }) {
    const isVoted = !!contestantVotes;
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
