import Link from "next/link";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Button } from "components/button";
import { Text } from "components/text";
import { Column, Row } from "components/box";
import { Icon } from "components/icon";
import { useQuery } from "react-query";
import { fetchGlobalSearchResults } from "lib/client/search";
import { AnimeSummaryCard, ArtistSummaryCard, ErrorCard, SummaryCard, ThemeSummaryCard } from "components/card";
import { useRouter } from "next/router";

export function SearchGlobal({ searchQuery }) {
    const fetchSearchResults = () => fetchGlobalSearchResults(
        searchQuery,
        4,
        ["anime", "theme", "artist", "series", "studio"]
    );

    const {
        data,
        error,
        isLoading,
        isError
    } = useQuery(
        ["searchGlobal", searchQuery],
        fetchSearchResults,
        {
            keepPreviousData: true
        }
    );

    if (isError) {
        return (
            <ErrorCard error={error}/>
        );
    }

    if (isLoading) {
        return (
            <Text block>Searching...</Text>
        );
    }

    const {
        anime: animeResults = [],
        theme: themeResults = [],
        artist: artistResults = [],
        series: seriesResults = [],
        studio: studioResults = []
    } = data;

    const totalResults =
        animeResults.length +
        themeResults.length +
        artistResults.length +
        seriesResults.length +
        studioResults.length;

    if (!totalResults) {
        return (
            <Text block>No results found for query &quot;{searchQuery}&quot;. Did you spell it correctly?</Text>
        );
    }

    return (
        <>
            <GlobalSearchSection
                entity="anime"
                title="Anime"
                results={animeResults}
                renderSummaryCard={(anime) => <AnimeSummaryCard key={anime.slug} anime={anime} previewThemes expandable/>}
            />
            <GlobalSearchSection
                entity="theme"
                title="Themes"
                results={themeResults}
                renderSummaryCard={(theme) => <ThemeSummaryCard key={theme.anime.slug + theme.slug} theme={theme}/>}
            />
            <GlobalSearchSection
                entity="artist"
                title="Artist"
                results={artistResults}
                renderSummaryCard={(artist) => <ArtistSummaryCard key={artist.slug} artist={artist}/>}
            />
            <GlobalSearchSection
                entity="series"
                title="Series"
                results={seriesResults}
                renderSummaryCard={(series) => (
                    <SummaryCard key={series.slug} title={series.name} description="Series"
                        to={`/series/${series.slug}`}/>
                )}
            />
            <GlobalSearchSection
                entity="studio"
                title="Studios"
                results={studioResults}
                renderSummaryCard={(studio) => (
                    <SummaryCard key={studio.slug} title={studio.name} description="Studio"
                        to={`/studio/${studio.slug}`}/>
                )}
            />
        </>
    );
}

function GlobalSearchSection({ entity, title, results, renderSummaryCard }) {
    const router = useRouter();
    const urlParams = router.query;

    if (!results.length) {
        return null;
    }

    const resultsPreview = results.slice(0, 3);
    const hasMoreResults = results.length > 3;

    return (
        <>
            <Text variant="h2">{title}</Text>
            <Column style={{ "--gap": "16px" }}>
                {resultsPreview.map(renderSummaryCard)}
            </Column>
            {hasMoreResults && (
                <Row style={{ "--justify-content": "center" }}>
                    <Link href={{ pathname: `/search/${entity}`, query: urlParams }} passHref prefetch={false}>
                        <Button as="a" variant="silent" isCircle title="See all results">
                            <Icon icon={faChevronDown}/>
                        </Button>
                    </Link>
                </Row>
            )}
        </>
    );
}
