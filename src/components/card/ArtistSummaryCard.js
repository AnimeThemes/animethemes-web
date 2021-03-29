import useImage from "hooks/useImage";
import { SummaryCard } from "components/card";

export function ArtistSummaryCard({ artist, as }) {
    const { smallCover } = useImage(artist);

    const description = (
        <SummaryCard.Description>
            <span>Artist</span>
            {!!artist.performances && (
                <span>{artist.performances.length} performance{artist.performances.length === 1 ? "" : "s"}</span>
            )}
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
