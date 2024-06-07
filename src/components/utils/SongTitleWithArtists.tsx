import gql from "graphql-tag";

import { Text } from "@/components/text/Text";
import { Performances } from "@/components/utils/Performances";
import { SongTitle } from "@/components/utils/SongTitle";
import type { SongTitleWithArtistsArtistFragment, SongTitleWithArtistsSongFragment } from "@/generated/graphql";

interface SongTitleWithArtistsProps {
    song: SongTitleWithArtistsSongFragment | null;
    songTitleLinkTo?: string;
    artist?: SongTitleWithArtistsArtistFragment;
    onPlay?: () => void;
}

// Specify an artist if you want to display this in an artist context (e.g. artist page)
export function SongTitleWithArtists({ song, songTitleLinkTo, artist, onPlay }: SongTitleWithArtistsProps) {
    return (
        <Text onClick={onPlay}>
            <SongTitle song={song} href={songTitleLinkTo} />
            <Performances song={song} artist={artist} />
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
    `,
};
