import Link from "next/link";
import { Text } from "components/text";
import styled from "styled-components";
import gql from "graphql-tag";
import { SongTitle } from "components/utils";

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
    return (
        <Text>
            <SongTitle song={song} songTitleLinkTo={songTitleLinkTo}/>
            <Performances song={song} artist={artist}/>
        </Text>
    );
}

function Performances({ song, artist }) {
    if (!song?.performances?.length) {
        return null;
    }

    if (artist) {
        const performedAs = song.performances.find((performance) => performance.artist.slug === artist.slug);
        const performedWith = song.performances.filter((performance) => performance.artist.slug !== artist.slug);

        return (
            <>
                {!!performedAs.as && (
                    <Text variant="small" color="text-muted">
                        <span> as </span>
                        <span>
                            <Link href={`/artist/${performedAs.artist.slug}`} passHref prefetch={false}>
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
                                    <Link href={`/artist/${performance.artist.slug}`} passHref prefetch={false}>
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
    }

    return (
        <Text variant="small" color="text-muted">
            <span> by </span>
            <span>
                {song.performances.map((performance) => (
                    <StyledArtist key={performance.artist.slug}>
                        <Link href={`/artist/${performance.artist.slug}`} passHref prefetch={false}>
                            <StyledArtistLink>
                                {performance.as || performance.artist.name}
                            </StyledArtistLink>
                        </Link>
                    </StyledArtist>
                ))}
            </span>
        </Text>
    );
}

SongTitleWithArtists.fragments = {
    song: gql`
        fragment SongTitleWithArtists_song on Song {
            title
            performances {
                as
                artist {
                    slug
                    name
                }
            }
        }
    `,
    artist: gql`
        fragment SongTitleWithArtists_artist on Artist {
            slug
        }
    `
};
