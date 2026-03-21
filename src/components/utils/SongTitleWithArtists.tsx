import { Text } from "@/components/text/Text";
import { Performances } from "@/components/utils/Performances";
import { SongTitle } from "@/components/utils/SongTitle";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

export const SONG_TITLE_WITH_ARTISTS_SONG = graphql(`
    fragment SongTitleWithArtistsSong on Song {
        ...SongTitleSong
        ...PerformancesSong
    }
`);

export const SONG_TITLE_WITH_ARTISTS_ARTIST = graphql(`
    fragment SongTitleWithArtistsArtist on Artist {
        ...PerformancesArtist
    }
`);

interface SongTitleWithArtistsProps {
    song: FragmentType<typeof SONG_TITLE_WITH_ARTISTS_SONG> | null;
    songTitleLinkTo?: string;
    artist?: FragmentType<typeof SONG_TITLE_WITH_ARTISTS_ARTIST>;
    onPlay?: () => void;
}

// Specify an artist if you want to display this in an artist context (e.g. artist page)
export function SongTitleWithArtists({
    song: songFragment,
    songTitleLinkTo,
    artist: artistFragment,
    onPlay,
}: SongTitleWithArtistsProps) {
    const song = getFragmentData(SONG_TITLE_WITH_ARTISTS_SONG, songFragment);
    const artist = getFragmentData(SONG_TITLE_WITH_ARTISTS_ARTIST, artistFragment);

    return (
        <Text onClick={onPlay}>
            <SongTitle song={song} href={songTitleLinkTo} />
            <Performances song={song} artist={artist} />
        </Text>
    );
}
