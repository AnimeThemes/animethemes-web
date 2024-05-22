import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";

import gql from "graphql-tag";

import { Text } from "@/components/text/Text";
import type { SongTitleSongFragment } from "@/generated/graphql";

export interface SongTitleProps extends ComponentPropsWithoutRef<typeof Text> {
    song: SongTitleSongFragment | null
    href?: ComponentPropsWithoutRef<typeof Link>["href"]
}

export function SongTitle({ song, href, ...props }: SongTitleProps) {
    const songTitle = song?.title || "T.B.A.";

    if (href) {
        return (
            <Link href={href} passHref legacyBehavior>
                <Text as="a" link title={songTitle} italics={!song?.title} wrapAnywhere {...props}>{songTitle}</Text>
            </Link>
        );
    }

    return (
        <Text color="text-primary" weight="600" italics={!song?.title} wrapAnywhere {...props}>{songTitle}</Text>
    );
}

SongTitle.fragments = {
    song: gql`
        fragment SongTitleSong on Song {
            title
        }
    `
};
