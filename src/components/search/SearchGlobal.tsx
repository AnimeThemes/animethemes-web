import Link from "next/link";
import { faChevronDown } from "@fortawesome/pro-solid-svg-icons";
import { Button } from "components/button";
import { Text } from "components/text";
import { Column, Row } from "components/box";
import { Icon } from "components/icon";
import { useQuery } from "react-query";
import { AnimeSummaryCard, ArtistSummaryCard, ErrorCard, SummaryCard, ThemeSummaryCard } from "components/card";
import { useRouter } from "next/router";
import { fetchDataClient } from "lib/client";
import gql from "graphql-tag";
import type { SearchGlobalQuery, SearchGlobalQueryVariables } from "generated/graphql";
import type { ReactNode } from "react";

interface SearchGlobalProps {
    searchQuery?: string
}

export function SearchGlobal({ searchQuery }: SearchGlobalProps) {
    const fetchSearchResults = () => fetchDataClient<SearchGlobalQuery, SearchGlobalQueryVariables>(gql`
        ${AnimeSummaryCard.fragments.anime}
        ${AnimeSummaryCard.fragments.expandable}
        ${ThemeSummaryCard.fragments.theme}
        ${ThemeSummaryCard.fragments.expandable}
        ${ArtistSummaryCard.fragments.artist}
        
        query SearchGlobal($args: SearchArgs!) {
            search(args: $args) {
                anime {
                    ...AnimeSummaryCardAnime
                    ...AnimeSummaryCardAnimeExpandable
                }
                themes {
                    ...ThemeSummaryCardTheme
                    ...ThemeSummaryCardThemeExpandable
                }
                artists {
                    ...ArtistSummaryCardArtist
                }
                series {
                    slug
                    name
                }
                studios {
                    slug
                    name
                }
            }
        }
    `, { args: { query: searchQuery ?? null } });

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

    if (isLoading || !data) {
        return (
            <Text block>Searching...</Text>
        );
    }

    const {
        anime: animeResults = [],
        themes: themeResults = [],
        artists: artistResults = [],
        series: seriesResults = [],
        studios: studioResults = []
    } = data.data.search;

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
                renderSummaryCard={(anime) => <AnimeSummaryCard key={anime.slug} anime={anime} expandable/>}
            />
            <GlobalSearchSection
                entity="theme"
                title="Themes"
                results={themeResults}
                renderSummaryCard={(theme) => <ThemeSummaryCard key={theme.anime?.slug + theme.slug} theme={theme} expandable/>}
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

interface GlobalSearchSectionProps<T> {
    entity: string
    title: string
    results: Array<T>
    renderSummaryCard: (result: T) => ReactNode
}

function GlobalSearchSection<T>({ entity, title, results, renderSummaryCard }: GlobalSearchSectionProps<T>) {
    const router = useRouter();
    const urlParams = router.query;

    if (!results.length) {
        return null;
    }

    const resultsPreview = results.slice(0, 3);
    const hasMoreResults = results.length > 3;

    return <>
        <Text variant="h2">{title}</Text>
        <Column style={{ "--gap": "16px" }}>
            {resultsPreview.map(renderSummaryCard)}
        </Column>
        {hasMoreResults && (
            <Row style={{ "--justify-content": "center" }}>
                <Link
                    href={{ pathname: `/search/${entity}`, query: urlParams }}
                    passHref
                    legacyBehavior>
                    <Button as="a" variant="silent" isCircle title="See all results">
                        <Icon icon={faChevronDown}/>
                    </Button>
                </Link>
            </Row>
        )}
    </>;
}
