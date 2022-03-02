import styled from "styled-components";

const Flex = styled.div`
    --justify-content: initial;
    --align-items: initial;
    --gap: initial;
    
    display: flex;

    flex-wrap: ${(props) => props.wrap && "wrap"};
    
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
