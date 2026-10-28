import { useQuery } from "@apollo/client/react";
import { range } from "lodash-es";

import { Column } from "@/components/box/Flex";
import PlaylistSummaryCard from "@/components/card/PlaylistSummaryCard";
import { Skeleton } from "@/components/skeleton/Skeleton";
import { graphql } from "@/graphql/generated";

const query = graphql(`
    query HomePageRecentlyAddedPlaylists {
        playlistConnection(sort: [CREATED_AT_DESC], pagination: { first: 10 }) {
            nodes {
                ...PlaylistSummaryCardPlaylist
                ...PlaylistSummaryCardPlaylistWithOwner
            }
        }
    }
`);

export function RecentlyAddedPlaylists() {
    const { data } = useQuery(query);
    const recentlyAddedPlaylists = data?.playlistConnection.nodes ?? range(10).map(() => null);

    return (
        <Column style={{ "--gap": "16px" }}>
            {recentlyAddedPlaylists.map((playlist, index) => (
                <Skeleton key={index} variant="summary-card" delay={index * 100}>
                    {playlist ? <PlaylistSummaryCard playlist={playlist} playlistWithOwner={playlist} /> : null}
                </Skeleton>
            ))}
        </Column>
    );
}
