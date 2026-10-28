import { useQuery } from "@apollo/client/react";
import { range } from "lodash-es";

import { Column } from "@/components/box/Flex";
import { VideoSummaryCard } from "@/components/card/VideoSummaryCard";
import { VideoMenu } from "@/components/menu/VideoMenu";
import { Skeleton } from "@/components/skeleton/Skeleton";
import { graphql } from "@/graphql/generated";

const query = graphql(`
    query HomePageRecentlyAdded {
        videoConnection(sort: [ID_DESC], pagination: { first: 10 }) {
            nodes {
                ...VideoSummaryCardVideo
                ...VideoMenuVideo
                entries {
                    nodes {
                        ...VideoSummaryCardEntry
                        ...VideoMenuEntry
                        theme {
                            ...VideoSummaryCardTheme
                        }
                    }
                }
            }
        }
    }
`);

export function RecentlyAddedVideos() {
    const { data } = useQuery(query);
    const recentlyAdded = data?.videoConnection.nodes ?? range(10).map(() => null);

    return (
        <Column style={{ "--gap": "16px" }}>
            {recentlyAdded.map((video, index) => (
                <Skeleton key={index} variant="summary-card" delay={index * 100}>
                    {video ? (
                        <VideoSummaryCard
                            video={video}
                            entry={video.entries.nodes[0]}
                            theme={video.entries.nodes[0].theme}
                            menu={<VideoMenu video={video} entry={video.entries.nodes[0]} />}
                        />
                    ) : null}
                </Skeleton>
            ))}
        </Column>
    );
}
