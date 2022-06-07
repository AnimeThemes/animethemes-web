import styled from "styled-components";
import { loadingAnimation } from "styles/mixins";
import { fadeIn } from "styles/animations";
import theme from "theme";

const StyledSkeleton = styled.div`    
    ${loadingAnimation}
`;

const StyledSkeletonSummaryCard = styled(StyledSkeleton)`
    height: 64px;
    border-radius: ${theme.scalars.borderRadiusCard};
`;

const StyledContent = styled.div`
    animation: ${fadeIn} 500ms var(--delay) both;
`;

export function Skeleton({ children, variant, delay = 0 }) {
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
