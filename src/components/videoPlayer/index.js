import React, {useContext, useRef, useState} from "react";
import styled, {css} from "styled-components";
import {motion} from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faExpandAlt, faPause, faPlay, faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "components/button";
import {gapsRow} from "styles/mixins";
import {navigate} from "gatsby";
import PlayerContext from "context/playerContext";
import Elevator from "components/elevator";
import createVideoSlug from "utils/createVideoSlug";
import { useMedia } from "react-media";

const videoBaseUrl = process.env.GATSBY_VIDEO_URL || "https://animethemes.moe";

const StyledPlayer = styled.div`
    ${(props) => props.background ? css`
        position: fixed;
        width: 352px;
        bottom: 1rem;
        left: 1rem;
        z-index: 10;

        @media (max-width: 720px) {
            width: calc(50vw - 2rem);
        }
    ` : css`
        @media (max-width: 720px) and (orientation: portrait) {
            position: sticky;
            top: 0;
        }
        @media (min-width: 721px) {
            margin: 0 auto;
            padding: 1.5rem 1rem 0 1rem;
            max-width: 1100px;
        }
    `}
`;
const StyledVideoContainer = styled(motion.div)`
    flex: 1;
        
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 56.25%;
`;
const StyledVideo = styled.video`
    outline: none;
    background-color: rgb(0, 0, 0);

    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
`;
const StyledOverlay = styled(motion.div)`    
    flex: 2;
        
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    
    ${gapsRow("0.5rem")}

    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 20;

    opacity: ${(props) => props.force ? 1 : 0};
    transition: 250ms opacity;

    &:hover {
        opacity: 1;
    }

    @media (max-width: 720px) {
        display: none;
    }
`;
const StyledPlayerButton = styled(Button)`
    padding: 1rem;
    border-radius: 3rem;
    
    font-size: ${(props) => props.size || "1rem"};
    color: ${(props) => props.theme.colors.primaryTitle};
    
    background-color: ${(props) => props.theme.colors.primaryTransparent};

    &:hover {
        background-color: ${(props) => props.theme.colors.primaryBackground[0]};
    }
`;

export default function VideoPlayer({ video, entry, background, ...props }) {
    const [ isPlaying, setPlaying ] = useState(false);
    const playerRef = useRef();
    const { setCurrentVideo } = useContext(PlayerContext);
    const isMobile = useMedia({ query: "(max-width: 720px)" });

    function togglePlay() {
        if (isPlaying) {
            playerRef.current.pause();
        } else {
            playerRef.current.play();
        }
    }

    function maximize() {
        const videoSlug = createVideoSlug(entry.theme, entry, video);
        navigate(`/anime/${entry.theme.anime.slug}/${videoSlug}`);
    }

    function preventTextSelection(event) {
        if (event.detail > 1) {
            event.preventDefault();
        }
    }

    return (
        <Elevator>
            <StyledPlayer
                background={background}
                onDoubleClick={background ? maximize : undefined}
                onMouseDown={preventTextSelection}
                onClick={background && isMobile ? maximize : undefined}
                {...props}
            >
                <StyledVideoContainer
                    background={background}
                    layout
                    transition={{ type: "tween" }}
                >
                    <StyledVideo
                        ref={playerRef}
                        src={`${videoBaseUrl}/video/${video.basename}`}
                        controls={!background}
                        autoPlay
                        onPlay={() => setPlaying(true)}
                        onPause={() => setPlaying(false)}
                        onEnded={() => setPlaying(false)}
                    >
                        Your browser doesn&apos;t support HTML5 video playback. Please use a modern browser.
                    </StyledVideo>
                </StyledVideoContainer>
                {background && (
                    <StyledOverlay force={!isPlaying}>
                        <Elevator>
                            <StyledPlayerButton onClick={() => setCurrentVideo(null)}>
                                <FontAwesomeIcon icon={faTimes} fixedWidth/>
                            </StyledPlayerButton>
                            <StyledPlayerButton size="2rem" onClick={togglePlay}>
                                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} fixedWidth/>
                            </StyledPlayerButton>
                            <StyledPlayerButton onClick={maximize}>
                                <FontAwesomeIcon icon={faExpandAlt} fixedWidth/>
                            </StyledPlayerButton>
                        </Elevator>
                    </StyledOverlay>
                )}
            </StyledPlayer>
        </Elevator>
    );
}
