import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { gapsRow } from "styles/mixins";
import { Button } from "components/button";

export const StyledPlayer = styled.div`
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

export const StyledVideoContainer = styled(motion.div)`
    flex: 1;
        
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 56.25%;
`;

export const StyledVideo = styled.video`
    outline: none;
    background-color: rgb(0, 0, 0);

    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
`;

export const StyledOverlay = styled(motion.div)`    
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

    &:hover {
        opacity: 1;
    }

    @media (max-width: 720px) {
        display: none;
    }
`;

export const StyledPlayerButton = styled(Button)`
    padding: 1rem;
    
    font-size: ${(props) => props.size || "1rem"};
    
    opacity: 0.5;

    &:hover {
        opacity: 1;
    }
`;
