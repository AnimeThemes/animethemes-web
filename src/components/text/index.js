import React from "react";
import styled, { css } from "styled-components";
import {StyledTextBase} from "components/text/style";
import PropTypes from "prop-types";

const StyledText = styled(StyledTextBase)`
    ${(props) => props.small && css`
        font-size: 0.8rem;
        font-weight: bold;
    `}
`;

export default function Text({ children, ...props }) {
    return (
        <StyledText {...props}>
            {children}
        </StyledText>
    );
}

Text.propTypes = {
    ...StyledText.propTypes,
    small: PropTypes.bool
};
