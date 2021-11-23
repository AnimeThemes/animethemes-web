import { Fragment } from "react";
import Link from "next/link";
import { Text } from "components/text";

// Specify an artist if you want to display this in an artist context (e.g. artist page)
export function SongTitleWithArtists({ song, songTitleLinkTo, artist }) {
    const songTitle = song.title || "T.B.A.";

    return (
        <Text>
            {songTitleLinkTo
                ? (
                    <Link href={songTitleLinkTo} passHref>
                        <Text as="a" link italics={!song.title}>{songTitle}</Text>
                    </Link>
                )
                : (
                    <Text color="text-primary" fontWeight="600" italics={!song.title}>{songTitle}</Text>
                )
            }
            {artist ? (() => {
                const performedAs = song.performances.find((performance) => performance.artist.slug === artist.slug);
                const performedWith = song.performances.filter((performance) => performance.artist.slug !== artist.slug);

                return (
                    <>
                        {!!performedAs.as && (
                            <>
                                <Text variant="small" color="text-muted"> as </Text>
                                <Link href={`/artist/${performedAs.artist.slug}`} passHref>
                                    <Text as="a" link>
                                        {performedAs.as}
                                    </Text>
                                </Link>
                            </>
                        )}
                        {!!performedWith.length && (
                            <>
                                <Text variant="small" color="text-muted"> with </Text>
                                {performedWith.map((performance, index) => (
                                    <Fragment key={performance.artist.slug}>
                                        <Link href={`/artist/${performance.artist.slug}`} passHref>
                                            <Text as="a" link>
                                                {performance.as || performance.artist.name}
                                            </Text>
                                        </Link>
                                        {index < performedWith.length - 1 && (
                                            <Text variant="small" color="text-muted">
                                                {index === performedWith.length - 2 ? " & " : ", "}
                                            </Text>
                                        )}
                                    </Fragment>
                                ))}
                            </>
                        )}
                    </>
                );
            })() : (!!song.performances.length && (
                <>
                    <Text variant="small" color="text-muted"> by </Text>
                    {song.performances.map((performance, index) => (
                        <Fragment key={performance.artist.slug}>
                            <Link href={`/artist/${performance.artist.slug}`} passHref>
                                <Text as="a" link>
                                    {performance.as || performance.artist.name}
                                </Text>
                            </Link>
                            {index < song.performances.length - 1 && (
                                <Text variant="small" color="text-muted">
                                    {index === song.performances.length - 2 ? " & " : ", "}
                                </Text>
                            )}
                        </Fragment>
                    ))}
                </>
            ))}
        </Text>
    );
}
