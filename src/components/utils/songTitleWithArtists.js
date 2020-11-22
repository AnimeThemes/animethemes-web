import Text from "components/text";
import {Link} from "gatsby";

export default function SongTitleWithArtists({ song }) {
    return (
        <>
            <span>{song.title}</span>
            {!!song.performances && !!song.performances.length && (
                <>
                    <Text small> by </Text>
                    {song.performances.map((performance, index) => (
                        <>
                            <Link to={`/artist/${performance.artist.slug}`}>
                                <Text key={performance.as || performance.artist.name} link>
                                    {performance.as || performance.artist.name}
                                </Text>
                            </Link>
                            {index < song.performances.length - 1 && (
                                <Text small>
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
