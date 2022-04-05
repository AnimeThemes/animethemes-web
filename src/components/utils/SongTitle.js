import Link from "next/link";
import { Text } from "components/text";

export function SongTitle({ song, songTitleLinkTo }) {
    const songTitle = song?.title || "T.B.A.";

    if (songTitleLinkTo) {
        return (
            <Link href={songTitleLinkTo} passHref>
                <Text as="a" link title={songTitle} italics={!song?.title}>{songTitle}</Text>
            </Link>
        );
    }

    return (
        <Text color="text-primary" weight="600" italics={!song?.title}>{songTitle}</Text>
    );
}
