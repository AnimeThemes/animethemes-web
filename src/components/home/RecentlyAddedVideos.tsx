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
                        videoConnection(sort: [ID_DESC], pagination: { first: 10 }) {
                            nodes {
                                ...VideoSummaryCardVideo
                                animethemeentries {
                                    nodes {
                                        ...VideoSummaryCardEntry
                                        animetheme {
                                            ...VideoSummaryCardTheme
                                        }
                                    }
                                }
                            }
                        }
                    }
                `),
            });

            return data.videoConnection.nodes;
        },
    });

    return (
        <Column style={{ "--gap": "16px" }}>
            {recentlyAdded.map((video, index) => (
                <Skeleton key={index} variant="summary-card" delay={index * 100}>
                    {video ? (
                        <VideoSummaryCard
                            video={video}
                            entry={video.animethemeentries.nodes[0]}
                            theme={video.animethemeentries.nodes[0].animetheme}
                        />
                    ) : null}
                </Skeleton>
            ))}
        </Column>
    );
}
