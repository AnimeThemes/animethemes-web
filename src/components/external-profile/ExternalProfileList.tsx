import styled from "styled-components";

import { Button } from "@/components/button/Button";
import { ExternalProfileAddDialog } from "@/components/external-profile/ExternalProfileAddDialog";
import { Text } from "@/components/text/Text";
import { withHover } from "@/styles/mixins";

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr auto auto 1fr;
    justify-content: center;
    gap: 16px;

    & > * {
        grid-column: 1 / -1;

        display: grid;
        grid-template-columns: subgrid;
    }
`;
const StyledButton = styled(Button)`
    grid-column: 1 / -1;

    display: grid;
    grid-template-columns: subgrid;
    gap: inherit;

    background-color: var(--background-color);
    color: #ffffff;

    transition: background-color 200ms;

    ${withHover`
        background-color: color-mix(in oklab, var(--background-color), #000 10%);
    `}
`;
const StyledSubgrid = styled.div`
    grid-column: 2 / -2;

    display: grid;
    grid-template-columns: subgrid;
`;
const StyledLogo = styled.img`
    justify-self: center;
    align-self: center;
    height: 1em;
`;

export default function ExternalProfileList() {
    return (
        <StyledGrid>
            <ExternalProfileAddDialog
                preselectedSite="AniList"
                trigger={
                    <StyledButton style={{ "--background-color": "#152232" }}>
                        <StyledSubgrid>
                            <StyledLogo src="/img/anilist.svg" alt="AniList" />
                            <Text>Add AniList</Text>
                        </StyledSubgrid>
                    </StyledButton>
                }
            />
            <ExternalProfileAddDialog
                preselectedSite="MyAnimeList"
                trigger={
                    <StyledButton style={{ "--background-color": "#2e51a2" }}>
                        <StyledSubgrid>
                            <StyledLogo src="/img/myanimelist.svg" alt="MyAnimeList" />
                            <Text>Add MyAnimeList</Text>
                        </StyledSubgrid>
                    </StyledButton>
                }
            />
        </StyledGrid>
    );
}
