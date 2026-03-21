import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";

import { Text } from "@/components/text/Text";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

export const SONG_TITLE_SONG = graphql(`
    fragment SongTitleSong on Song {
        title
    }
`);

export interface SongTitleProps extends ComponentPropsWithoutRef<typeof Text> {
    song: FragmentType<typeof SONG_TITLE_SONG> | null;
    href?: ComponentPropsWithoutRef<typeof Link>["href"];
}

export function SongTitle({ song: songFragment, href, ...props }: SongTitleProps) {
    const song = getFragmentData(SONG_TITLE_SONG, songFragment);
    const songTitle = song?.title || "T.B.A.";

    if (href) {
        return (
            <Text as={Link} href={href} link title={songTitle} italics={!song?.title} wrapAnywhere {...props}>
                {songTitle}
            </Text>
        );
    }

    return (
        <Text color="text-primary" weight="600" italics={!song?.title} wrapAnywhere {...props}>
            {songTitle}
        </Text>
    );
}
