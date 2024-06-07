import type { MDXRemoteSerializeResult } from "next-mdx-remote";

import { AnimeAwardsNowAvailable } from "@/components/event/AnimeAwardsNowAvailable";
import { Markdown } from "@/components/markdown/Markdown";

interface AnnouncementCardProps {
    announcementSource: MDXRemoteSerializeResult;
}

export function AnnouncementCard({ announcementSource }: AnnouncementCardProps) {
    return <Markdown source={announcementSource} components={{ AnimeAwardsNowAvailable }} />;
}
