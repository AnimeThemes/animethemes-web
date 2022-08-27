import extractImages from "utils/extractImages";
import { SummaryCard } from "components/card";
import gql from "graphql-tag";
import type { ArtistSummaryCardArtistFragment } from "generated/graphql";

type ArtistSummaryCardProps = {
    artist: ArtistSummaryCardArtistFragment
    as?: string | null
};

export function ArtistSummaryCard({ artist, as }: ArtistSummaryCardProps) {
    const { smallCover } = extractImages(artist);

    const description = (
        <SummaryCard.Description>
            <span>Artist</span>
            {!!as && (
                <span>As {as}</span>
            )}
        </SummaryCard.Description>
    );

    return (
        <SummaryCard
            title={artist.name}
            description={description}
            image={smallCover}
            to={`/artist/${artist.slug}`}
        />
    );
}

ArtistSummaryCard.fragments = {
    artist: gql`
        fragment ArtistSummaryCardArtist on Artist {
            slug
            name
            images {
                link
                facet
            }
        }
    `
};
