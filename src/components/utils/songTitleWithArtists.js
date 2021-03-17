import { Fragment } from "react";
import { Link } from "gatsby";
import { Text } from "components/text";

export function SongTitleWithArtists({ song, songTitleLinkTo }) {
    return (
        <Text>
            {songTitleLinkTo
                ? (
                    <Link to={songTitleLinkTo}>
                        <Text link>{song.title}</Text>
                    </Link>
                )
                : (
                    <Text color="text-primary" fontWeight="500">{song.title}</Text>
                )
            }
            {!!song.performances && !!song.performances.length && (
                <>
                    <Text variant="small" color="text-muted"> by </Text>
                    {song.performances.map((performance, index) => (
                        <Fragment key={performance.artist.slug}>
                            <Link to={`/artist/${performance.artist.slug}`}>
                                <Text link>
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
            )}
        </Text>
    );
}
