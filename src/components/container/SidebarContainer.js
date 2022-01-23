import styled from "styled-components";

export const SidebarContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 2rem 1.5rem;

    @media (max-width: 870px) {
        grid-template-columns: 1fr;
    }
`;
