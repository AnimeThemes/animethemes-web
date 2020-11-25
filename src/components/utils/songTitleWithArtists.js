import Text from "components/text";
import {Link} from "gatsby";
import theme from "theme";

export default function SongTitleWithArtists({ song }) {
    return (
        <>
            <Text color={theme.colors.secondaryTitle}>{song.title}</Text>
            {!!song.performances && !!song.performances.length && (
                <>
                    <Text small color={theme.colors.primaryMediumEmphasis}> by </Text>
                    {song.performances.map((performance, index) => (
                        <>
                            <Link to={`/artist/${performance.artist.slug}`}>
                                <Text key={performance.as || performance.artist.name} link>
                                    {performance.as || performance.artist.name}
                                </Text>
                            </Link>
                            {index < song.performances.length - 1 && (
                                <Text small color={theme.colors.primaryMediumEmphasis}>
                                    {index === song.performances.length - 2 ? " & " : ", "}
                                </Text>
                            )}
                        </>
                    ))}
                </>
            )}
        </>
    );
}
