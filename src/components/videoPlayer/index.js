import React, {useContext, useRef, useState} from "react";
import styled, {css} from "styled-components";
import {motion} from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExpand, faPause, faPlay, faTimes} from "@fortawesome/free-solid-svg-icons";
import Button from "components/button";
import {gapsRow} from "styles/mixins";
import {navigate} from "gatsby";
import PlayerContext from "context/playerContext";
import elevatedPrimaryBackground from "styles/helper";
import Elevator from "components/elevator";

const videoBaseUrl = process.env.GATSBY_VIDEO_URL || "https://animethemes.moe";

const StyledPlayer = styled.div`
    ${(props) => props.background ? css`
        position: fixed;
        width: calc((100vw - 1100px) / 2 - 2rem);
        bottom: 1rem;
        left: 1rem;
        z-index: 10;
        
        @media (max-width: 1600px) {
            width: calc(100% - 2rem);
            max-width: 400px;
            right: 1rem;

            border-left: 4px solid ${(props) => props.theme.colors.secondaryTitle};
            border-radius: 0 0.5rem 0.5rem 0;
            background-color: ${elevatedPrimaryBackground};
            box-shadow: 0 0 20px rgb(0, 0, 0);
    
            display: flex;
            flex-direction: row;
        }
    ` : css`
        margin-bottom: 2rem;
    `}
`;
const StyledVideoContainer = styled(motion.div)`
    flex: 1;
        
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 56.25%;

    @media (max-width: 1600px) {
        ${(props) => props.background && css`
            padding-top: calc(56.25% / 3);
        `}
    }
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

    @media (min-width: 1601px) {
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
    }
`;
const StyledPlayerButton = styled(Button)`
    padding: 1rem;
    border-radius: 3rem;
    
    font-size: ${(props) => props.size || "1rem"};
    color: ${(props) => props.theme.colors.primaryTitle};
    
    @media (min-width: 1601px) {
        background-color: rgba(0, 0, 0, 0.5);

        &:hover {
            background-color: ${(props) => props.theme.colors.primaryBackground[0]};
        }
    }

    @media (max-width: 1600px) {
        padding: 0.5rem;
        
        font-size: calc(${(props) => props.size || "1rem"} * 0.75);
    }
`;

export default function VideoPlayer({ video, background, ...props }) {
    const [ isPlaying, setPlaying ] = useState(false);
    const playerRef = useRef();
    const { setCurrentVideo } = useContext(PlayerContext);

    function togglePlay() {
        if (isPlaying) {
            playerRef.current.pause();
        } else {
            playerRef.current.play();
        }
    }

    function maximize() {
        navigate(`/video/${video.filename}`);
    }

    function preventTextSelection(event) {
        if (event.detail > 1) {
            event.preventDefault();
        }
    }

    return (
        <Elevator>
            <StyledPlayer background={background} onDoubleClick={background && maximize} onMouseDown={preventTextSelection} {...props}>
                <StyledVideoContainer background={background} layout transition={{ type: "tween" }}>
                    <StyledVideo
                        ref={playerRef}
                        src={`${videoBaseUrl}/video/${video.basename}`}
                        controls={!background}
                        autoPlay
                        onPlay={() => setPlaying(true)}
                        onPause={() => setPlaying(false)}
                        onEnded={() => setPlaying(false)}
                    >
                        Your browser doesn't support HTML5 video playback. Please use a modern browser.
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
                                <FontAwesomeIcon icon={faExpand} fixedWidth/>
                            </StyledPlayerButton>
                        </Elevator>
                    </StyledOverlay>
                )}
            </StyledPlayer>
        </Elevator>
    );
}
