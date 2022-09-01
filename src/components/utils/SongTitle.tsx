import Link from "next/link";
import { Text } from "components/text";
import gql from "graphql-tag";
import type { SongTitleSongFragment } from "generated/graphql";

export interface SongTitleProps {
    song: SongTitleSongFragment | null
    songTitleLinkTo?: string
}

export function SongTitle({ song, songTitleLinkTo }: SongTitleProps) {
    const songTitle = song?.title || "T.B.A.";

    if (songTitleLinkTo) {
        return (
            <Link href={songTitleLinkTo} passHref legacyBehavior>
                <Text as="a" link title={songTitle} italics={!song?.title} wrapAnywhere>{songTitle}</Text>
            </Link>
        );
    }

    return (
        <Text color="text-primary" weight="600" italics={!song?.title} wrapAnywhere>{songTitle}</Text>
    );
}

SongTitle.fragments = {
    song: gql`
        fragment SongTitleSong on Song {
            title
        }
    `
};
