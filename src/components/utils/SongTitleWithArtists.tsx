import { Text } from "@/components/text/Text";
import { Performances } from "@/components/utils/Performances";
import { SongTitle } from "@/components/utils/SongTitle";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

export const SONG_TITLE_WITH_ARTISTS_SONG = graphql(`
    fragment SongTitleWithArtistsSong on Song {
        ...SongTitleSong
        ...StaffSong
        id
    }
`);

export const SONG_TITLE_WITH_ARTISTS_ARTIST = graphql(`
    fragment SongTitleWithArtistsArtist on Artist {
        ...SongStaffArtist
        id
    }
`);

interface SongTitleWithArtistsProps {
    song: FragmentType<typeof SONG_TITLE_WITH_ARTISTS_SONG> | null;
    songTitleLinkTo?: string;
    onPlay?: () => void;
}

export function SongTitleWithArtists({
    song: songFragment,
    songTitleLinkTo,
    onPlay,
}: SongTitleWithArtistsProps) {
    const song = getFragmentData(SONG_TITLE_WITH_ARTISTS_SONG, songFragment);

    return (
        <Text onClick={onPlay}>
            <SongTitle song={song} href={songTitleLinkTo} />
            <Performances song={song} />
        </Text>
    );
}
