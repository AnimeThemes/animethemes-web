import styled from "styled-components";
import { Icon } from "components/icon";
import type { ReactNode } from "react";
import { faSpinnerThird } from "@fortawesome/pro-solid-svg-icons";

const StyledWrapper = styled.div`
    position: relative;
    
    display: inline-flex;
    justify-content: center;
    align-items: center;
`;
const StyledIcon = styled(Icon)`
    position: absolute;
    font-size: 1.25rem;
`;

interface BusyProps {
    children?: ReactNode;
    isBusy: boolean;
}

export function Busy({ isBusy, children, ...props }: BusyProps) {
    return (
        <StyledWrapper {...props}>
            <span style={{ visibility: isBusy ? "hidden" : undefined }}>{children}</span>
            {isBusy ? (
                <StyledIcon icon={faSpinnerThird} className="fa-spin"/>
            ) : null}
        </StyledWrapper>
    );
}