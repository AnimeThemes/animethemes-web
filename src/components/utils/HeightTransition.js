import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StyledShadowFix = styled.div`
    overflow: hidden;
    margin-bottom: -32px;
`;

const StyledHeightTransition = styled.div`
    height: ${(props) => props.height};
    transition: height 250ms;
    margin-bottom: 32px;
`;

export function HeightTransition({ children }) {
    const [height, setHeight] = useState(null);
    const ref = useRef(null);

    useEffect(() => {
        setHeight(ref.current.children[0].offsetHeight);
    }, [children]);

    return (
        <StyledShadowFix>
            <StyledHeightTransition ref={ref} height={height ? `${height}px` : "auto"}>
                {children}
            </StyledHeightTransition>
        </StyledShadowFix>
    );
}
