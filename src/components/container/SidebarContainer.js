import styled from "styled-components";
import theme from "theme";

export const SidebarContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 32px 24px;

    @media (max-width: ${theme.breakpoints.mobileMax}) {
        grid-template-columns: 1fr;
    }
`;
