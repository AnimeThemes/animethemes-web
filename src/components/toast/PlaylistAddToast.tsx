import Link from "next/link";

import { Row } from "@/components/box/Flex";
import type { FetchThemeSummaryCardData } from "@/components/card/ThemeSummaryCard";
import { Text } from "@/components/text/Text";
import { Toast } from "@/components/toast/Toast";
import { SongTitle } from "@/components/utils/SongTitle";

interface PlaylistAddToastProps {
    theme: Exclude<FetchThemeSummaryCardData, null>;
}

export function PlaylistAddToast({ theme }: PlaylistAddToastProps) {
    return (
        <Toast as={Link} href="/profile/playlist" $hoverable>
            <Row $wrap style={{ "--justify-content": "space-between", "--gap": "8px" }}>
                <span>
                    <SongTitle song={theme.song} /> was added to the playlist!
                </span>
                <Text color="text-disabled">(Click to view playlist.)</Text>
            </Row>
        </Toast>
    );
}
