import { useQuery } from "@tanstack/react-query";
import { range } from "lodash-es";

import { Column } from "@/components/box/Flex";
import { VideoSummaryCard } from "@/components/card/VideoSummaryCard";
import { Skeleton } from "@/components/skeleton/Skeleton";
import { client } from "@/graphql/client";
import { graphql } from "@/graphql/generated";

export function MostPopularEntries() {
    const { data: mostPopular = range(10).map(() => null) } = useQuery({
        queryKey: ["HomePageTrending"],
        queryFn: async () => {
            const { data } = await client.query({
                query: graphql(`
                    query HomePageMostPopular {
                        animethemeentryPagination(sort: [TRACKS_COUNT_DESC], first: 10) {
                            data {
                                ...VideoSummaryCardEntry
                                videos(first: 1) {
                                    nodes {
                                        ...VideoSummaryCardVideo
                                    }
                                }
                            }
                        }
                    }
                `),
            });

            return data.animethemeentryPagination.data;
        },
    });

    return (
        <Column style={{ "--gap": "16px" }}>
            {mostPopular.map((entry, index) => (
                <Skeleton key={index} variant="summary-card" delay={index * 100}>
                    {entry ? <VideoSummaryCard video={entry.videos.nodes[0]} entry={entry} /> : null}
                </Skeleton>
            ))}
        </Column>
    );
}
