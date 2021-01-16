import {Fragment} from "react";
import {Link} from "gatsby";
import theme from "theme";
import Text from "components/text";

export default function SongTitleWithArtists({ song, songTitleLinkTo }) {
    return (
        <Text>
            {songTitleLinkTo
                ? (
                    <Link to={songTitleLinkTo}>
                        <Text link>{song.title}</Text>
                    </Link>
                )
                : (
                    <Text color={theme.colors.secondaryTitle}>{song.title}</Text>
                )
            }
            {!!song.performances && !!song.performances.length && (
                <>
                    <Text small color={theme.colors.primaryMediumEmphasis}> by </Text>
                    {song.performances.map((performance, index) => (
                        <Fragment key={performance.artist.slug}>
                            <Link to={`/artist/${performance.artist.slug}`}>
                                <Text link>
                                    {performance.as || performance.artist.name}
                                </Text>
                            </Link>
                            {index < song.performances.length - 1 && (
                                <Text small color={theme.colors.primaryMediumEmphasis}>
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
