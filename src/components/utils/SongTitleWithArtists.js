import { Text } from "components/text";
import gql from "graphql-tag";
import { Performances, SongTitle } from "components/utils";

// Specify an artist if you want to display this in an artist context (e.g. artist page)
export function SongTitleWithArtists({ song, songTitleLinkTo, artist }) {
    return (
        <Text>
            <SongTitle song={song} songTitleLinkTo={songTitleLinkTo}/>
            <Performances song={song} artist={artist}/>
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
