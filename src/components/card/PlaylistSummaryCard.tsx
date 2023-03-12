import { SummaryCard } from "components/card/SummaryCard";
import type { PropsWithChildren } from "react";
import gql from "graphql-tag";
import type { PlaylistSummaryCardPlaylistFragment } from "generated/graphql";
import type { ReactNode } from "react";
import styled from "styled-components";
import theme from "theme";

const StyledWrapper = styled.div`
    position: relative
`;

const StyledOverlayButtons = styled.div`
    position: absolute;
    right: 16px;
    opacity: 0;
    transition-property: opacity;

    ${StyledWrapper}:hover & {
        position: static;
        opacity: 1;
        transition-duration: 250ms;
    }

    @media (max-width: ${theme.breakpoints.mobileMax}) {
        position: static;
        opacity: 1;
    }
`;

interface PlaylistSummaryCardProps {
    playlist: PlaylistSummaryCardPlaylistFragment;
    menu?: ReactNode;
}

export default function PlaylistSummaryCard({ playlist, children, menu, ...props }: PropsWithChildren<PlaylistSummaryCardProps>) {
    const description = (
        <SummaryCard.Description>
            <span>Playlist</span>
            <span>{playlist.visibility}</span>
        </SummaryCard.Description>
    );

    return (
        <StyledWrapper>
            <SummaryCard title={playlist.name} description={description} to={`/playlist/${playlist.id}`} {...props}>
                {children}
                {menu ? (
                    <StyledOverlayButtons onClick={(event) => event.stopPropagation()}>
                        {menu}
                    </StyledOverlayButtons>
                ) : null}
            </SummaryCard>
        </StyledWrapper>
    );
}

PlaylistSummaryCard.fragments = {
    playlist: gql`
        fragment PlaylistSummaryCardPlaylist on Playlist {
            id
            name
            visibility
        } 
    `,
};
