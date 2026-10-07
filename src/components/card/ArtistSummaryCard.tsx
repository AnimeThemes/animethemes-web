import { SummaryCard } from "@/components/card/SummaryCard";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";
import extractImages from "@/utils/extractImages";

export const ARTIST_SUMMARY_CARD_ARTIST = graphql(`
    fragment ArtistSummaryCardArtist on Artist {
        slug
        name {
            main
        }
        images {
            nodes {
                ...extractImagesImage
            }
        }
    }
`);

type ArtistSummaryCardProps = {
    artist: FragmentType<typeof ARTIST_SUMMARY_CARD_ARTIST>;
    as?: string | null;
    roles?: Array<string>;
};

export function ArtistSummaryCard({ artist: artistFragment, as, roles }: ArtistSummaryCardProps) {
    const artist = getFragmentData(ARTIST_SUMMARY_CARD_ARTIST, artistFragment);

    const { smallCover } = extractImages(artist.images.nodes);

    const description = (
        <SummaryCard.Description>
            <span>
                {!roles?.length
                    ? "Artist"
                    : roles.length > 1
                        ? `${roles.slice(0, -1).join(", ")} & ${roles.at(-1)}`
                        : roles[0]
                }
            </span>
            {!!as && <span>As {as}</span>}
        </SummaryCard.Description>
    );

    return (
        <SummaryCard
            title={artist.name.main}
            description={description}
            image={smallCover}
            to={`/artist/${artist.slug}`}
        />
    );
}
