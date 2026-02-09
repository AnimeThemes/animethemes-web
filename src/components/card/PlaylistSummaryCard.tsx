import type { PropsWithChildren, ReactNode } from "react";
import styled from "styled-components";

import { SummaryCard } from "@/components/card/SummaryCard";
import { Text } from "@/components/text/Text";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";
import theme from "@/theme";

const StyledWrapper = styled.div`
    position: relative;
`;

const StyledOverlayButtons = styled.div`
    position: absolute;
    right: 16px;
    opacity: 0;
    transition-property: opacity;

    ${StyledWrapper}:hover &, &:has([data-state="open"]) {
        position: static;
        opacity: 1;
        transition-duration: 250ms;
    }

    @media (max-width: ${theme.breakpoints.mobileMax}) {
        position: static;
        opacity: 1;
    }
`;

const fragments = {
    playlist: graphql(`
        fragment PlaylistSummaryCardPlaylist on Playlist {
            id
            name
            visibilityLocalized
            tracksCount
        }
    `),
    playlistWithOwner: graphql(`
        fragment PlaylistSummaryCardPlaylistWithOwner on Playlist {
            user {
                name
            }
        }
    `),
};

interface PlaylistSummaryCardProps {
    playlist: FragmentType<typeof fragments.playlist>;
    playlistWithOwner?: FragmentType<typeof fragments.playlistWithOwner>;
    menu?: ReactNode;
}

export default function PlaylistSummaryCard({
    playlist: playlistFragment,
    playlistWithOwner: playlistWithOwnerFragment,
    children,
    menu,
    ...props
}: PropsWithChildren<PlaylistSummaryCardProps>) {
    const playlist = getFragmentData(fragments.playlist, playlistFragment);
    const playlistWithOwner = getFragmentData(fragments.playlistWithOwner, playlistWithOwnerFragment);

    const description = (
        <SummaryCard.Description>
            <span>Playlist</span>
            {playlistWithOwner ? (
                <Text link>{playlistWithOwner.user?.name}</Text>
            ) : (
                <span>{playlist.visibilityLocalized}</span>
            )}
            <span>
                {playlist.tracksCount} theme{playlist.tracksCount !== 1 ? "s" : null}
            </span>
        </SummaryCard.Description>
    );

    return (
        <StyledWrapper>
            <SummaryCard title={playlist.name} description={description} to={`/playlist/${playlist.id}`} {...props}>
                {children}
                {menu ? (
                    <StyledOverlayButtons onClick={(event) => event.stopPropagation()}>{menu}</StyledOverlayButtons>
                ) : null}
            </SummaryCard>
        </StyledWrapper>
    );
}
