import { SummaryCard } from "components/card/SummaryCard";
import type { PropsWithChildren } from "react";
import gql from "graphql-tag";
import type { PlaylistSummaryCardPlaylistFragment } from "generated/graphql";

interface PlaylistSummaryCardProps {
    playlist: PlaylistSummaryCardPlaylistFragment
}

export default function PlaylistSummaryCard({ playlist, children }: PropsWithChildren<PlaylistSummaryCardProps>) {
    const description = (
        <SummaryCard.Description>
            <span>Playlist</span>
            <span>{playlist.visibility}</span>
        </SummaryCard.Description>
    );

    return (
        <SummaryCard title={playlist.name} description={description} to={`/playlist/${playlist.id}`}>
            {children}
        </SummaryCard>
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
