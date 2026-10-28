import { useQuery } from "@apollo/client/react";
import { range } from "lodash-es";

import { Column } from "@/components/box/Flex";
import { VideoSummaryCard } from "@/components/card/VideoSummaryCard";
import { VideoMenu } from "@/components/menu/VideoMenu";
import { Skeleton } from "@/components/skeleton/Skeleton";
import { graphql } from "@/graphql/generated";

const query = graphql(`
    query HomePageMostPopular {
        mostPopularEntries(pagination: { first: 10 }) {
            nodes {
                ...VideoSummaryCardEntry
                ...VideoMenuEntry
                theme {
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
`);

export function MostPopularEntries() {
    const { data } = useQuery(query);
    const mostPopular = data?.mostPopularEntries.nodes ?? range(10).map(() => null);

    return (
        <Column style={{ "--gap": "16px" }}>
            {mostPopular.map((entry, index) => (
                <Skeleton key={index} variant="summary-card" delay={index * 100}>
                    {entry ? (
                        <VideoSummaryCard
                            video={entry.videos.nodes[0]}
                            entry={entry}
                            theme={entry.theme}
                            menu={<VideoMenu video={entry.videos.nodes[0]} entry={entry} />}
                        />
                    ) : null}
                </Skeleton>
            ))}
        </Column>
    );
}
