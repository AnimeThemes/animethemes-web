import { useQuery } from "@tanstack/react-query";
import { range } from "lodash-es";

import { Column } from "@/components/box/Flex";
import PlaylistSummaryCard from "@/components/card/PlaylistSummaryCard";
import { Skeleton } from "@/components/skeleton/Skeleton";
import { client } from "@/graphql/client";
import { graphql } from "@/graphql/generated";

export function RecentlyAddedPlaylists() {
    const { data: recentlyAddedPlaylists = range(10).map(() => null) } = useQuery({
        queryKey: ["HomePageRecentlyAddedPlaylists"],
        queryFn: async () => {
            const { data } = await client.query({
                query: graphql(`
                    query HomePageRecentlyAddedPlaylists {
                        playlistPagination(sort: [CREATED_AT_DESC], first: 10) {
                            data {
                                ...PlaylistSummaryCardPlaylist
                                ...PlaylistSummaryCardPlaylistWithOwner
                            }
                        }
                    }
                `),
            });

            return data.playlistPagination.data;
        },
    });

    return (
        <Column style={{ "--gap": "16px" }}>
            {recentlyAddedPlaylists?.map((playlist, index) => (
                <Skeleton key={index} variant="summary-card" delay={index * 100}>
                    {playlist ? <PlaylistSummaryCard playlist={playlist} playlistWithOwner={playlist} /> : null}
                </Skeleton>
            ))}
        </Column>
    );
}
