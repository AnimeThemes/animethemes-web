import { keyframes } from "styled-components";

export const flipDown = keyframes`
    from {
        opacity: 0;
        transform: perspective(1000px) rotateX(-45deg);
    }
    to {
        opacity: 1;
        transform: perspective(1000px);
    }
`;

export const fadeIn = keyframes`
    from {
        opacity: 0;
    }
`;

export const slideIn = (y = "100%", x = "0") => keyframes`
    from {
        transform: translate(${x}, ${y});
    }
`;

export const zoomIn = keyframes`
    from {
        opacity: 0;
        transform: scale(0.9);
    }
`;

export const blurOut = keyframes`
    from {
        backdrop-filter: none;
    }
    to {
        backdrop-filter: brightness(0.5);
    }
`;
