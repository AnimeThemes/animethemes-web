import styled from "styled-components";

const StyledSearchFilter = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export function SearchFilter({ ...props }) {
    return (
        <StyledSearchFilter {...props}/>
    );
}
