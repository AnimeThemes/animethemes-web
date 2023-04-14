import Link from "next/link";
import { Text } from "components/text";
import gql from "graphql-tag";
import type { SongTitleSongFragment } from "generated/graphql";
import type { ComponentPropsWithoutRef } from "react";
import type { Url } from "next/dist/shared/lib/router/router";

export interface SongTitleProps extends ComponentPropsWithoutRef<typeof Text> {
    song: SongTitleSongFragment | null
    href?: Url
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
