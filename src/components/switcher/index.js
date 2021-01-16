import React from "react";
import styled from "styled-components";
import elevatedPrimaryBackground from "styles/helper";
import { Flex } from "components/flex";

const StyledSwitcher = styled(Flex).attrs({
    flexInline: true,
    gapsRow: "0.5rem"
})`
    background-color: ${elevatedPrimaryBackground};

    border-radius: 1rem;
`;

export default function Switcher({ children, ...props }) {
    return (
        <StyledSwitcher {...props}>
            {children}
        </StyledSwitcher>
    );
}
