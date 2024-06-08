import type { PropsWithChildren } from "react";
import type { ReactNode } from "react";
import styled from "styled-components";

import gql from "graphql-tag";

import { SummaryCard } from "@/components/card/SummaryCard";
import { Text } from "@/components/text/Text";
import type { PlaylistSummaryCardPlaylistFragment, PlaylistSummaryCardShowOwnerFragment } from "@/generated/graphql";
import theme from "@/theme";

const StyledWrapper = styled.div`
    position: relative;
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

type PlaylistSummaryCardProps =
    | {
          playlist: PlaylistSummaryCardPlaylistFragment;
          menu?: ReactNode;
          showOwner?: false;
      }
    | {
          playlist: PlaylistSummaryCardPlaylistFragment & PlaylistSummaryCardShowOwnerFragment;
          menu?: ReactNode;
          showOwner: true;
      };

export default function PlaylistSummaryCard({
    playlist,
    children,
    menu,
    showOwner,
    ...props
}: PropsWithChildren<PlaylistSummaryCardProps>) {
    const description = (
        <SummaryCard.Description>
            <span>Playlist</span>
            {showOwner ? <Text link>{playlist.user.name}</Text> : <span>{playlist.visibility}</span>}
            <span>
                {playlist.tracks_count} theme{playlist.tracks_count !== 1 ? "s" : null}
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

PlaylistSummaryCard.fragments = {
    playlist: gql`
        fragment PlaylistSummaryCardPlaylist on Playlist {
            id
            name
            visibility
            tracks_count
        }
    `,
    showOwner: gql`
        fragment PlaylistSummaryCardShowOwner on Playlist {
            user {
                name
            }
        }
    `,
};
