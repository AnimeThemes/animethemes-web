import styled from "styled-components";

const StyledSearchFilterGroup = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 16px;
`;

export function SearchFilterGroup({ children }) {
    return (
        <StyledSearchFilterGroup>
            {children}
        </StyledSearchFilterGroup>
    );
}
