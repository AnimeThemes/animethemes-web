import type { ReactNode } from "react";
import styled from "styled-components";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { Icon } from "@/components/icon/Icon";

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
            {isBusy ? <StyledIcon icon={faSpinner} className="fa-spin" /> : null}
        </StyledWrapper>
    );
}
