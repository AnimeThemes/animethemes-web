import React from "react";
import styled, {css} from "styled-components";
import {motion} from "framer-motion";
import {navigate} from "gatsby";

const StyledVideoContainer = styled(motion.div)`
    ${(props) => props.background ? css`
        position: fixed;
        width: 15vw;
        bottom: 1rem;
        left: 1rem;
        cursor: pointer;
    ` : css`
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 56.25%;
        margin-bottom: 1rem;
    `}
`;
const StyledVideo = styled.video`
    outline: none;
    
    ${(props) => props.background ? css`
        width: 15vw;
    ` : css`
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    `}
`;

export default function VideoPlayer({ video, background, ...props }) {
    return (
        <StyledVideoContainer background={background} onClick={() => navigate(`/video/${video.filename}`)} {...props}>
            <StyledVideo src={video.link.replace(".dev", ".moe")} background={background} controls={!background} autoPlay>
                Your browser doesn't support HTML5 video playback. Please use a modern browser.
            </StyledVideo>
        </StyledVideoContainer>
    );
}
