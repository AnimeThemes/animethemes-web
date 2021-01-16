import styled, { css } from "styled-components";
import elevatedPrimaryBackground from "styles/helper";
import PropTypes from "prop-types";

export const StyledTextBase = styled.span.attrs((props) => ({
    as: props.as || (props.code ? "code" : "span")
}))`
    color: ${(props) => props.color || "inherit"};

    ${(props) => props.link && css`
        color: ${(props) => props.theme.colors.secondaryTitle};
            
        &:hover {
            text-decoration: underline;
        }
    `}

    ${(props) => props.bold && css`
        font-weight: bold;
    `}
    
    ${(props) => props.block && css`
        display: block;
    `}

    ${(props) => props.maxLines && css`
        display: -webkit-box;
        -webkit-line-clamp: ${props.maxLines};
        -webkit-box-orient: vertical;
        overflow: hidden;
    `}

    ${(props) => props.truncate && css`
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    `}
  
    ${(props) => props.code && css`
        font-family: monospace;
        padding: 0.25rem;
        border-radius: 0.25rem;
        background-color: ${elevatedPrimaryBackground};
        line-height: 1.5rem;
    `}

    margin: 0;
`;

StyledTextBase.propTypes = {
    color: PropTypes.string,
    link: PropTypes.bool,
    block: PropTypes.bool,
    maxLines: PropTypes.number,
    code: PropTypes.bool
};
