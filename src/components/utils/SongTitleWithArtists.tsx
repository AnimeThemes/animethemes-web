import { Text } from "@/components/text/Text";
import { Performances } from "@/components/utils/Performances";
import { SongTitle } from "@/components/utils/SongTitle";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

const fragments = {
    song: graphql(`
        fragment SongTitleWithArtistsSong on Song {
            ...SongTitleSong
            ...PerformancesSong
        }
    `),
    artist: graphql(`
        fragment SongTitleWithArtistsArtist on Artist {
            ...PerformancesArtist
        }
    `),
};

interface SongTitleWithArtistsProps {
    song: FragmentType<typeof fragments.song> | null;
    songTitleLinkTo?: string;
    artist?: FragmentType<typeof fragments.artist>;
    onPlay?: () => void;
}

// Specify an artist if you want to display this in an artist context (e.g. artist page)
export function SongTitleWithArtists({
    song: songFragment,
    songTitleLinkTo,
    artist: artistFragment,
    onPlay,
}: SongTitleWithArtistsProps) {
    const song = getFragmentData(fragments.song, songFragment);
    const artist = getFragmentData(fragments.artist, artistFragment);

    return (
        <Text onClick={onPlay}>
            <SongTitle song={song} href={songTitleLinkTo} />
            <Performances song={song} artist={artist} />
        </Text>
    );
}
