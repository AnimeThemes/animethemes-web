import { useQuery } from "@tanstack/react-query";
import gql from "graphql-tag";
import { range } from "lodash-es";

import { Column } from "@/components/box/Flex";
import {
    VideoSummaryCard,
    VideoSummaryCardFragmentEntry,
    VideoSummaryCardFragmentVideo,
} from "@/components/card/VideoSummaryCard";
import { Skeleton } from "@/components/skeleton/Skeleton";
import type { HomePageRecentlyAddedQuery } from "@/generated/graphql";
import { fetchDataClient } from "@/lib/client";

export function RecentlyAddedVideos() {
    const { data: recentlyAdded } = useQuery<HomePageRecentlyAddedQuery["videoAll"] | Array<null>>({
        queryKey: ["HomePageRecentlyAdded"],
        queryFn: async () => {
            const { data } = await fetchDataClient<HomePageRecentlyAddedQuery>(gql`
                ${VideoSummaryCardFragmentVideo}
                ${VideoSummaryCardFragmentEntry}

                query HomePageRecentlyAdded {
                    videoAll(orderBy: "id", orderDesc: true, limit: 10) {
                        ...VideoSummaryCardVideo
                        entries {
                            ...VideoSummaryCardEntry
                        }
                    }
                }
            `);

            return data.videoAll;
        },
        placeholderData: range(10).map(() => null),
    });

    return (
        <Column style={{ "--gap": "16px" }}>
            {recentlyAdded?.map((video, index) => (
                <Skeleton key={index} variant="summary-card" delay={index * 100}>
                    {video ? <VideoSummaryCard video={video} entry={video.entries[0]} /> : null}
                </Skeleton>
            ))}
        </Column>
    );
}
