import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { Markdown } from "components/markdown/Markdown";
import { AnimeAwardsNowAvailable } from "components/event/AnimeAwardsNowAvailable";

interface AnnouncementCardProps {
    announcementSource: MDXRemoteSerializeResult;
}

export function AnnouncementCard({ announcementSource }: AnnouncementCardProps) {
    return (
        <Markdown source={announcementSource} components={{ AnimeAwardsNowAvailable }} />
    );
}
