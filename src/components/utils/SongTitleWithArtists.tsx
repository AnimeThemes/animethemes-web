import { Text } from "components/text";
import { Performances, SongTitle } from "components/utils";
import gql from "graphql-tag";
import type { SongTitleWithArtistsArtistFragment, SongTitleWithArtistsSongFragment } from "generated/graphql";

interface SongTitleWithArtistsProps {
    song: SongTitleWithArtistsSongFragment | null
    songTitleLinkTo?: string
    artist?: SongTitleWithArtistsArtistFragment
}

// Specify an artist if you want to display this in an artist context (e.g. artist page)
export function SongTitleWithArtists({ song, songTitleLinkTo, artist }: SongTitleWithArtistsProps) {
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
        
        fragment SongTitleWithArtistsSong on Song {
            ...SongTitleSong
            ...PerformancesSong
        }
    `,
    artist: gql`
        ${Performances.fragments.artist}
        
        fragment SongTitleWithArtistsArtist on Artist {
            ...PerformancesArtist
        }
    `
};
