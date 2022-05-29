import Link from "next/link";
import { Text } from "components/text";
import gql from "graphql-tag";

export function SongTitle({ song, songTitleLinkTo }) {
    const songTitle = song?.title || "T.B.A.";

    if (songTitleLinkTo) {
        return (
            <Link href={songTitleLinkTo} passHref prefetch={false}>
                <Text as="a" link title={songTitle} italics={!song?.title}>{songTitle}</Text>
            </Link>
        );
    }

    return (
        <Text color="text-primary" weight="600" italics={!song?.title}>{songTitle}</Text>
    );
}

SongTitle.fragments = {
    song: gql`
        fragment SongTitle_song on Song {
            title
        }
    `
};
