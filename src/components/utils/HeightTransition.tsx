import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import type { Property } from "csstype";

const StyledShadowFix = styled.div`
    overflow: hidden;
    margin-bottom: -32px;
`;

const StyledHeightTransition = styled.div<{ height: Property.Height }>`
    height: ${(props) => props.height};
    transition: height 250ms;
    margin-bottom: 32px;
`;

interface HeightTransitionProps {
    children: ReactNode
}

export function HeightTransition({ children }: HeightTransitionProps) {
    const [height, setHeight] = useState<number | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setHeight((ref.current?.children[0] as HTMLElement).offsetHeight);
    }, [children]);

    return (
        <StyledShadowFix>
            <StyledHeightTransition ref={ref} height={height ? `${height}px` : "auto"}>
                {children}
            </StyledHeightTransition>
        </StyledShadowFix>
    );
}
