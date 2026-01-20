import { SummaryCard } from "@/components/card/SummaryCard";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";
import extractImages from "@/utils/extractImages";

const fragments = {
    artist: graphql(`
        fragment ArtistSummaryCardArtist on Artist {
            slug
            name
            images {
                nodes {
                    ...extractImagesImage
                }
            }
        }
    `),
};

type ArtistSummaryCardProps = {
    artist: FragmentType<typeof fragments.artist>;
    as?: string | null;
};

export function ArtistSummaryCard({ artist: artistFragment, as }: ArtistSummaryCardProps) {
    const artist = getFragmentData(fragments.artist, artistFragment);

    const { smallCover } = extractImages(artist.images.nodes);

    const description = (
        <SummaryCard.Description>
            <span>Artist</span>
            {!!as && <span>As {as}</span>}
        </SummaryCard.Description>
    );

    return (
        <SummaryCard title={artist.name} description={description} image={smallCover} to={`/artist/${artist.slug}`} />
    );
}
