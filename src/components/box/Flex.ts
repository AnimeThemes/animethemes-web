import styled from "styled-components";
import type { Property } from "csstype";

const Flex = styled.div<{
    $wrap?: boolean
    style?: {
        "--justify-content"?: Property.JustifyContent
        "--align-items"?: Property.AlignItems
        "--gap"?: Property.Gap
    }
}>`
    --justify-content: initial;
    --align-items: initial;
    --gap: initial;
    
    display: flex;

    flex-wrap: ${(props) => props.$wrap && "wrap"};
    
    justify-content: var(--justify-content);
    align-items: var(--align-items);
    gap: var(--gap);
`;

export const Row = styled(Flex)`
    flex-direction: row;
`;

export const Column = styled(Flex)`
    flex-direction: column;
`;
