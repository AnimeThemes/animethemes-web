import styled, { css } from "styled-components";
import { Flex } from "components/box";
import { Text } from "components/text";
import { gapsColumn } from "styles/mixins";
import { Card } from "components/card";

export const StyledThemeCard = styled(Card)`
    ${gapsColumn()}
`;

export const StyledRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const StyledSequence = styled(Text).attrs((props) => ({
    variant: "small",
    color: props.secondary ? "text-muted" : "text"
}))`
    display: flex;

    width: 2.5rem;

    ${(props) => props.secondary && css`
        @media (max-width: 720px) {
            align-self: flex-start;
        }
    `}
`;

export const StyledHeader = styled.div`
    flex: 1;
`;

export const StyledVersion = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    @media (max-width: 720px) {
        flex-direction: column;
        align-items: flex-start;

        ${gapsColumn()}
    }
`;

export const StyledVideoListContainer = styled.div`
    flex: 1;
`;

export const StyledVideoList = styled(Flex).attrs({
    flexWrap: "wrap",
    gapsBoth: "0.75rem"
})`
    @media (min-width: 721px) {
        justify-content: flex-end;
    }
`;
