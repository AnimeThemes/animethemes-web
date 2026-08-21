import { useQuery } from "@tanstack/react-query";
import { range } from "lodash-es";

import { Column } from "@/components/box/Flex";
import { VideoSummaryCard } from "@/components/card/VideoSummaryCard";
import { VideoMenu } from "@/components/menu/VideoMenu";
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
                        mostPopularEntries(pagination: { first: 10 }) {
                            nodes {
                                ...VideoSummaryCardEntry
                                ...VideoMenuEntry
                                animetheme {
                                    ...VideoSummaryCardTheme
                                }
                                videos {
                                    nodes {
                                        ...VideoSummaryCardVideo
                                        ...VideoMenuVideo
                                    }
                                }
                            }
                        }
                    }
                `),
            });

            return data.mostPopularEntries.nodes;
        },
    });

    return (
        <Column style={{ "--gap": "16px" }}>
            {mostPopular.map((entry, index) => (
                <Skeleton key={index} variant="summary-card" delay={index * 100}>
                    {entry ? (
                        <VideoSummaryCard
                            video={entry.videos.nodes[0]}
                            entry={entry}
                            theme={entry.animetheme}
                            menu={<VideoMenu video={entry.videos.nodes[0]} entry={entry} />}
                        />
                    ) : null}
                </Skeleton>
            ))}
        </Column>
    );
}
