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
import type { HomePageMostViewedQuery } from "@/generated/graphql";
import { fetchDataClient } from "@/lib/client/index";

export function MostViewedVideos() {
    const { data: mostViewed } = useQuery<HomePageMostViewedQuery["videoAll"] | Array<null>>({
        queryKey: ["HomePageTrending"],
        queryFn: async () => {
            const { data } = await fetchDataClient<HomePageMostViewedQuery>(gql`
                ${VideoSummaryCardFragmentVideo}
                ${VideoSummaryCardFragmentEntry}

                query HomePageMostViewed {
                    videoAll(orderBy: "views_count", orderDesc: true, limit: 10) {
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
            {mostViewed?.map((video, index) => (
                <Skeleton key={index} variant="summary-card" delay={index * 100}>
                    {video ? <VideoSummaryCard video={video} entry={video.entries[0]} /> : null}
                </Skeleton>
            ))}
        </Column>
    );
}
