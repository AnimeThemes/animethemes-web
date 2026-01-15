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
import type { HomePageMostPopularQuery } from "@/generated/graphql";
import { fetchDataClient } from "@/lib/client/index";

export function MostPopularEntries() {
    const { data: mostPopular } = useQuery<HomePageMostPopularQuery["entryAll"] | Array<null>>({
        queryKey: ["HomePageTrending"],
        queryFn: async () => {
            const { data } = await fetchDataClient<HomePageMostPopularQuery>(gql`
                ${VideoSummaryCardFragmentEntry}
                ${VideoSummaryCardFragmentVideo}

                query HomePageMostPopular {
                    entryAll(orderBy: "tracks_count", orderDesc: true, limit: 10) {
                        ...VideoSummaryCardEntry
                        videos {
                            ...VideoSummaryCardVideo
                        }
                    }
                }
            `);

            return data.entryAll;
        },
        placeholderData: range(10).map(() => null),
    });

    return (
        <Column style={{ "--gap": "16px" }}>
            {mostPopular?.map((entry, index) => (
                <Skeleton key={index} variant="summary-card" delay={index * 100}>
                    {entry ? <VideoSummaryCard video={entry.videos[0]} entry={entry} /> : null}
                </Skeleton>
            ))}
        </Column>
    );
}
