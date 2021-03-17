import styled from "styled-components";
import { Text } from "components/text";

const StyledDescriptionList = styled.dl`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 0;
`;
const StyledKey = styled.dt`
    margin: 0 0 0.25rem 0;
`;
const StyledValue = styled.dd`
    margin: 0;

    &:not(:last-child) {
        margin-bottom: 1.5rem;
    }
`;

export function DescriptionList({ children, ...props }) {
    return (
        <StyledDescriptionList {...props}>
            {children}
        </StyledDescriptionList>
    );
}

DescriptionList.Item = function DescriptionListItem({ title, children }) {
    return (
        <>
            <StyledKey>
                <Text as="span" variant="h2">{title}</Text>
            </StyledKey>
            <StyledValue>{children}</StyledValue>
        </>
    );
}
