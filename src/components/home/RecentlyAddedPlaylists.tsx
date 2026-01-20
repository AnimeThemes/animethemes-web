import { useQuery } from "@tanstack/react-query";
import gql from "graphql-tag";
import { range } from "lodash-es";

import { Column } from "@/components/box/Flex";
import PlaylistSummaryCard from "@/components/card/PlaylistSummaryCard";
import { Skeleton } from "@/components/skeleton/Skeleton";
import type { HomePageRecentlyAddedPlaylistsQuery } from "@/generated/graphql";
import { fetchDataClient } from "@/lib/client/index";

export function RecentlyAddedPlaylists() {
    const { data: recentlyAddedPlaylists } = useQuery<HomePageRecentlyAddedPlaylistsQuery["playlistAll"] | null[]>({
        queryKey: ["HomePageRecentlyAddedPlaylists"],
        queryFn: async () => {
            const { data } = await fetchDataClient<HomePageRecentlyAddedPlaylistsQuery>(gql`
                ${PlaylistSummaryCard.fragments.playlist}
                ${PlaylistSummaryCard.fragments.showOwner}

                query HomePageRecentlyAddedPlaylists {
                    playlistAll(orderBy: "created_at", orderDesc: true, limit: 10, onlyNonEmpty: true) {
                        ...PlaylistSummaryCardPlaylist
                        ...PlaylistSummaryCardPlaylistWithOwner
                    }
                }
            `);

            return data.playlistAll;
        },
        placeholderData: range(10).map(() => null),
    });

    return (
        <Column style={{ "--gap": "16px" }}>
            {recentlyAddedPlaylists?.map((playlist, index) => (
                <Skeleton key={index} variant="summary-card" delay={index * 100}>
                    {playlist ? <PlaylistSummaryCard playlist={playlist} playlistWithOwner /> : null}
                </Skeleton>
            ))}
        </Column>
    );
}
