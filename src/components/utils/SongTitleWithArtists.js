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
        ${SongTitle.fragments.song}
        ${Performances.fragments.song}
        
        fragment SongTitleWithArtists_song on Song {
            ...SongTitle_song
            ...Performances_song
        }
    `,
    artist: gql`
        ${Performances.fragments.artist}
        
        fragment SongTitleWithArtists_artist on Artist {
            ...Performances_artist
        }
    `
};
