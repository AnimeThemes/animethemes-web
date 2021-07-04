import { AnimeSummaryCard, ArtistSummaryCard, ThemeSummaryCard } from "components/card";

export function SearchResultList({ results, entity }) {
    return (
        <>
            {results.map((result) => {
                switch (entity) {
                    case "anime":
                        return <AnimeSummaryCard key={result.slug} anime={result}/>;
                    case "theme":
                        return <ThemeSummaryCard key={result.anime.slug + result.slug} theme={result}/>;
                    case "artist":
                        return <ArtistSummaryCard key={result.slug} artist={result}/>;
                    default:
                        return null;
                }
            })}
        </>
    );
}
