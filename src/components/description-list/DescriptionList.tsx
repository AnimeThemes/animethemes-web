import styled from "styled-components";
import { Text } from "components/text";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

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

interface DescriptionListProps extends ComponentPropsWithoutRef<typeof StyledDescriptionList> {
    children: ReactNode
}

export function DescriptionList({ children, ...props }: DescriptionListProps) {
    return (
        <StyledDescriptionList {...props}>
            {children}
        </StyledDescriptionList>
    );
}

interface DescriptionListItemProps {
    title: string
    children: ReactNode
}

DescriptionList.Item = function DescriptionListItem({ title, children }: DescriptionListItemProps) {
    return (
        <>
            <StyledKey>
                <Text as="span" variant="h2">{title}</Text>
            </StyledKey>
            <StyledValue>{children}</StyledValue>
        </>
    );
};
