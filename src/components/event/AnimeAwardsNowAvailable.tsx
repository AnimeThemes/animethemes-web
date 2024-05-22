import styled, { keyframes } from "styled-components";
import Link from "next/link";

import { faArrowRight, faTrophy } from "@fortawesome/pro-solid-svg-icons";

import { Button } from "@/components/button/Button";
import { Icon } from "@/components/icon/Icon";
import { Text } from "@/components/text/Text";
import theme from "@/theme";

const EventButtonContainer = styled.div`
    position: relative;
    
    display: flex;
    flex-direction: column;
`;

const EventButton = styled(Button)`
    position: relative;
    justify-content: space-between;
    height: 64px;
    border-radius: 8px;
    gap: 8px;
    overflow: hidden;
`;

const EventIcon = styled(Icon)`
    margin: 0 0 -1rem -2rem;
    
    font-size: 56px;
    color: ${theme.colors["text-disabled"]};
`;

const GradientBorder = styled.div`
    position: absolute;
    inset: 0;
    border-radius: 8px;

    width: calc(100% + 4px);
    height: calc(100% + 4px);
    transform: translate(-2px, -2px);
    
    @property --gradient-angle {
        syntax: '<angle>';
        initial-value: 0deg;
        inherits: false;
    }

    --gradient-angle: 360deg;
    
    background: linear-gradient(var(--gradient-angle), ${theme.colors["text-primary"]}, #fff);
    animation: ${keyframes`
        from {
            --gradient-angle: 0deg;
        }
        to {
            --gradient-angle: 360deg;
        }
    `} 5s linear infinite;
    
    transition: opacity 250ms;
    opacity: 0;
    
    ${EventButtonContainer}:hover & {
        opacity: 1;
    }
`;

interface AnimeAwardsNowAvailableProps {
    year: number;
}

export function AnimeAwardsNowAvailable({ year }: AnimeAwardsNowAvailableProps) {
    return (
        <EventButtonContainer>
            <GradientBorder />
            <Link href="/event/anime-awards" passHref legacyBehavior>
                <EventButton forwardedAs="a">
                    <EventIcon icon={faTrophy} />
                    <Text><Text color="text-primary">/r/anime Awards {year}</Text>: Results are now available!</Text>
                    <Icon icon={faArrowRight} color="text-primary" />
                </EventButton>
            </Link>
        </EventButtonContainer>
    );
}