import useImage from "hooks/useImage";
import { SummaryCard } from "components/card";

export function ArtistSummaryCard({ artist }) {
    const { smallCover } = useImage(artist);

    const description = (
        <SummaryCard.Description>
            <span>Artist</span>
            {!!artist.performances && (
                <span>{artist.performances.length} songs</span>
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
