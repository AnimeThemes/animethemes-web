import Link from "next/link";
import { Text } from "components/text";
import styled from "styled-components";

const StyledArtist = styled(Text)`
    &:not(:first-of-type)::before {
        content: ", ";
    }

    &:not(:first-of-type):last-of-type::before {
        content: " & ";
    }
`;

const StyledArtistLink = styled(Text).attrs({ as: "a", link: true })`
    font-size: 1rem;
`;

// Specify an artist if you want to display this in an artist context (e.g. artist page)
export function SongTitleWithArtists({ song, songTitleLinkTo, artist }) {
    const songTitle = song.title || "T.B.A.";

    return (
        <Text>
            {songTitleLinkTo
                ? (
                    <Link href={songTitleLinkTo} passHref>
                        <Text as="a" link italics={!song.title} title={songTitle}>{songTitle}</Text>
                    </Link>
                )
                : (
                    <Text color="text-primary" weight="600" italics={!song.title}>{songTitle}</Text>
                )
            }
            {artist ? (() => {
                const performedAs = song.performances.find((performance) => performance.artist.slug === artist.slug);
                const performedWith = song.performances.filter((performance) => performance.artist.slug !== artist.slug);

                return (
                    <>
                        {!!performedAs.as && (
                            <Text variant="small" color="text-muted">
                                <span> as </span>
                                <span>
                                    <Link href={`/artist/${performedAs.artist.slug}`} passHref>
                                        <StyledArtistLink>
                                            {performedAs.as}
                                        </StyledArtistLink>
                                    </Link>
                                </span>
                            </Text>
                        )}
                        {!!performedWith.length && (
                            <Text variant="small" color="text-muted">
                                <span> with </span>
                                <span>
                                    {performedWith.map((performance) => (
                                        <StyledArtist key={performance.artist.slug}>
                                            <Link href={`/artist/${performance.artist.slug}`} passHref>
                                                <StyledArtistLink>
                                                    {performance.as || performance.artist.name}
                                                </StyledArtistLink>
                                            </Link>
                                        </StyledArtist>
                                    ))}
                                </span>
                            </Text>
                        )}
                    </>
                );
            })() : (!!song.performances.length && (
                <Text variant="small" color="text-muted">
                    <span> by </span>
                    <span>
                        {song.performances.map((performance) => (
                            <StyledArtist key={performance.artist.slug}>
                                <Link href={`/artist/${performance.artist.slug}`} passHref>
                                    <StyledArtistLink>
                                        {performance.as || performance.artist.name}
                                    </StyledArtistLink>
                                </Link>
                            </StyledArtist>
                        ))}
                    </span>
                </Text>
            ))}
        </Text>
    );
}
