import {Fragment} from "react";
import styled from "styled-components";
import Title from "components/text/title";

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

export default function DescriptionList({ children, ...props }) {
    return (
        <StyledDescriptionList {...props}>
            {Object.entries(children).filter(([, description]) => !!description).map(([ title, description ]) => (
                <Fragment key={title}>
                    <StyledKey>
                        <Title variant="section">{title}</Title>
                    </StyledKey>
                    <StyledValue>{description}</StyledValue>
                </Fragment>
            ))}
        </StyledDescriptionList>
    );
}
