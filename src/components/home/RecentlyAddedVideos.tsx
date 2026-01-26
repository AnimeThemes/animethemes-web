import { useQuery } from "@tanstack/react-query";
import { range } from "lodash-es";

import { Column } from "@/components/box/Flex";
import { VideoSummaryCard } from "@/components/card/VideoSummaryCard";
import { Skeleton } from "@/components/skeleton/Skeleton";
import { client } from "@/graphql/client";
import { graphql } from "@/graphql/generated";

export function RecentlyAddedVideos() {
    const { data: recentlyAdded = range(10).map(() => null) } = useQuery({
        queryKey: ["HomePageRecentlyAdded"],
        queryFn: async () => {
            const { data } = await client.query({
                query: graphql(`
                    query HomePageRecentlyAdded {
                        videoPagination(sort: [ID_DESC], first: 10) {
                            data {
                                ...VideoSummaryCardVideo
                                animethemeentries(first: 1) {
                                    nodes {
                                        ...VideoSummaryCardEntry
                                    }
                                }
                            }
                        }
                    }
                `),
            });

            return data.videoPagination.data;
        },
    });

    return (
        <Column style={{ "--gap": "16px" }}>
            {recentlyAdded.map((video, index) => (
                <Skeleton key={index} variant="summary-card" delay={index * 100}>
                    {video ? <VideoSummaryCard video={video} entry={video.animethemeentries.nodes[0]} /> : null}
                </Skeleton>
            ))}
        </Column>
    );
}
