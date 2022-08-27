import styled from "styled-components";
import { loadingAnimation } from "styles/mixins";
import { fadeIn } from "styles/animations";
import theme from "theme";
import type { ReactNode } from "react";
import type { Property } from "csstype";

const StyledSkeleton = styled.div`    
    ${loadingAnimation}
`;

const StyledSkeletonSummaryCard = styled(StyledSkeleton)`
    height: 64px;
    border-radius: ${theme.scalars.borderRadiusCard};
`;

const StyledContent = styled.div<{ style: { "--delay": Property.AnimationDelay } }>`
    animation: ${fadeIn} 500ms var(--delay) both;
`;

interface SkeletonProps {
    children: ReactNode
    variant?: "summary-card"
    delay?: number
}

export function Skeleton({ children, variant, delay = 0 }: SkeletonProps) {
    if (!children) {
        switch (variant) {
            case "summary-card":
                return <StyledSkeletonSummaryCard/>;
        }
    }

    return (
        <StyledContent style={{ "--delay": `${delay}ms` }}>
            {children}
        </StyledContent>
    );
}
