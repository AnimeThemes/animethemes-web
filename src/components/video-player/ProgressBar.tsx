import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";

import { VideoPlayerContext } from "@/components/video-player/VideoPlayer";
import theme from "@/theme";

const StyledPlayerProgress = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 16px 0;

    cursor: pointer;
    touch-action: none;
    transform: translateY(-50%);
`;

const StyledPlayerProgressBackground = styled.div`
    position: relative;
    width: 100%;
    height: 2px;

    background-color: ${theme.colors["solid-on-card"]};

    ${StyledPlayerProgress}:hover & {
        height: 4px;
    }
`;

const StyledPlayerProgressBar = styled.div`
    position: absolute;
    height: 100%;

    background-color: ${theme.colors["text-primary"]};

    &:after {
        content: " ";
        position: absolute;
        top: 50%;
        right: 0;
        display: block;
        width: 16px;
        height: 16px;
        border-radius: 8px;
        background-color: ${theme.colors["text-primary"]};
        transform: translateY(-50%);
        transition: opacity 200ms;
        opacity: 0;
    }

    ${StyledPlayerProgress}:hover &:after {
        opacity: 1;
        transform: translateY(-50%);
        transition: opacity 100ms;
    }
`;

const StyledPlayerProgressBarHover = styled.div`
    position: absolute;
    top: -24px;
    padding: 4px 8px;
    border-radius: 4px;

    background-color: ${theme.colors["solid"]};
    transform: translateX(-50%);

    display: none;

    ${StyledPlayerProgress}:hover & {
        display: block;
    }
`;

const StyledPlayerProgressBuffered = styled.div`
    position: absolute;
    width: 100%;
    height: 2px;
    
    background-color: ${theme.colors["white"]};
    opacity: 0.2;

    ${StyledPlayerProgress}:hover & {
        height: 4px;
    }
`;

export function ProgressBar() {
    const context = useContext(VideoPlayerContext);

    if (!context) {
        throw new Error("ProgressBar needs to be inside VideoPlayer!");
    }

    const { playerRef, progressRef, bufferedRef } = context;

    const progressHoverRef = useRef<HTMLDivElement>(null);

    const nextProgressRef = useRef(0);
    const isDraggingRef = useRef(false);

    useEffect(() => {
        function onMouseUp() {
            if (isDraggingRef.current) {
                isDraggingRef.current = false;
                document.body.style.removeProperty("user-select");
                if (playerRef.current) {
                    playerRef.current.currentTime = nextProgressRef.current * playerRef.current.duration;
                }
            }
        }

        function onMouseMove(event: MouseEvent) {
            const nextProgress = Math.min(1, event.clientX / document.body.getBoundingClientRect().width);
            if (isDraggingRef.current) {
                nextProgressRef.current = nextProgress;
                if (progressRef.current) {
                    progressRef.current.style.width = `${nextProgress * 100}%`;
                }
            }
        }

        window.addEventListener("pointerup", onMouseUp);
        window.addEventListener("pointermove", onMouseMove);

        return () => {
            window.removeEventListener("pointerup", onMouseUp);
            window.removeEventListener("pointermove", onMouseMove);
        };
    }, [playerRef, progressRef]);

    return (
        <StyledPlayerProgress
            onPointerDown={(event) => {
                const nextProgress = event.clientX / event.currentTarget.getBoundingClientRect().width;
                isDraggingRef.current = true;
                nextProgressRef.current = nextProgress;
                document.body.style.userSelect = "none";
                if (progressRef.current) {
                    progressRef.current.style.width = `${nextProgress * 100}%`;
                }
            }}
            onPointerMove={(event) => {
                const nextProgress = event.clientX / event.currentTarget.getBoundingClientRect().width;
                if (progressHoverRef.current) {
                    progressHoverRef.current.innerText = playerRef.current
                        ? formatTime(nextProgress * playerRef.current.duration)
                        : "";

                    const widthCard = progressHoverRef.current.getBoundingClientRect().width;
                    const widthBody = document.body.getBoundingClientRect().width;
                    let left = nextProgress * widthBody;
                    if (left < 8 + widthCard / 2) {
                        left = 8 + widthCard / 2;
                    } else if (left > widthBody - 8 - widthCard / 2) {
                        left = widthBody - 8 - widthCard / 2;
                    }
                    progressHoverRef.current.style.left = `${left}px`;
                }
            }}
        >
            <StyledPlayerProgressBackground>
                <StyledPlayerProgressBuffered ref={bufferedRef} />
                <StyledPlayerProgressBar ref={progressRef} />
            </StyledPlayerProgressBackground>
            <StyledPlayerProgressBarHover ref={progressHoverRef} />
        </StyledPlayerProgress>
    );
}

function formatTime(time: number) {
    if (!isFinite(time)) {
        return "0:00";
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toLocaleString(undefined, { minimumIntegerDigits: 2 });

    return `${minutes}:${seconds}`;
}
