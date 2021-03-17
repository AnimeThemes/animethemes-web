import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StyledHeightTransition = styled.div`
    height: ${(props) => props.height};
    overflow: hidden;
    transition: height 250ms;
`;

export function HeightTransition({ children }) {
    const [height, setHeight] = useState(null);
    const ref = useRef(null);

    useEffect(() => {
        setHeight(ref.current.children[0].offsetHeight);
    }, [children]);

    return (
        <StyledHeightTransition ref={ref} height={height ? `${height}px` : "auto"}>
            {children}
        </StyledHeightTransition>
    );
}
