import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { Column, Row } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { AnimeSummaryCard } from "@/components/card/AnimeSummaryCard";
import { ArtistSummaryCard } from "@/components/card/ArtistSummaryCard";
import { ErrorCard } from "@/components/card/ErrorCard";
import PlaylistSummaryCard from "@/components/card/PlaylistSummaryCard";
import { SummaryCard } from "@/components/card/SummaryCard";
import { ThemeSummaryCard } from "@/components/card/ThemeSummaryCard";
import { Icon } from "@/components/icon/Icon";
import { Text } from "@/components/text/Text";
import { client } from "@/graphql/client";
import { graphql } from "@/graphql/generated";

const query = graphql(`
    query SearchGlobal($query: String!) {
        search(search: $query, first: 4) {
            anime {
                ...AnimeSummaryCardAnime
                ...AnimeSummaryCardAnimeExpandable
                slug
            }
            animethemes {
                ...ThemeSummaryCardTheme
                ...ThemeSummaryCardThemeExpandable
                id
                anime {
                    slug
                }
            }
            artists {
                ...ArtistSummaryCardArtist
                slug
            }
            series {
                slug
                name
            }
            studios {
                slug
                name
            }
            playlists {
                ...PlaylistSummaryCardPlaylist
                ...PlaylistSummaryCardPlaylistWithOwner
                id
            }
        }
    }
`);

interface SearchGlobalProps {
    searchQuery: string;
}

export function SearchGlobal({ searchQuery }: SearchGlobalProps) {
    const { data, error, isLoading, isError } = useQuery({
        queryKey: ["searchGlobal", searchQuery],
        queryFn: async () => {
            const { data } = await client.query({
                query,
                variables: { query: searchQuery },
            });

            return data;
        },
        placeholderData: keepPreviousData,
    });

    if (isError) {
        return <ErrorCard error={error} />;
    }

    if (isLoading || !data) {
        return <Text block>Searching...</Text>;
    }

    const {
        anime: animeResults = [],
        animethemes: themeResults = [],
        artists: artistResults = [],
        series: seriesResults = [],
        studios: studioResults = [],
        playlists: playlistResults = [],
    } = data.search;

    const totalResults =
        animeResults.length +
        themeResults.length +
        artistResults.length +
        seriesResults.length +
        studioResults.length +
        playlistResults.length;

    if (!totalResults) {
        return <Text block>No results found for query &quot;{searchQuery}&quot;. Did you spell it correctly?</Text>;
    }

    return (
        <>
            <GlobalSearchSection
                entity="anime"
                title="Anime"
                results={animeResults}
                renderSummaryCard={(anime) => <AnimeSummaryCard key={anime.slug} anime={anime} expandable={anime} />}
            />
            <GlobalSearchSection
                entity="theme"
                title="Themes"
                results={themeResults}
                renderSummaryCard={(theme) => (
                    <ThemeSummaryCard key={`${theme.anime?.slug}-${theme.id}`} theme={theme} expandable={theme} />
                )}
            />
            <GlobalSearchSection
                entity="artist"
                title="Artist"
                results={artistResults}
                renderSummaryCard={(artist) => <ArtistSummaryCard key={artist.slug} artist={artist} />}
            />
            <GlobalSearchSection
                entity="series"
                title="Series"
                results={seriesResults}
                renderSummaryCard={(series) => (
                    <SummaryCard
                        key={series.slug}
                        title={series.name}
                        description="Series"
                        to={`/series/${series.slug}`}
                    />
                )}
            />
            <GlobalSearchSection
                entity="studio"
                title="Studios"
                results={studioResults}
                renderSummaryCard={(studio) => (
                    <SummaryCard
                        key={studio.slug}
                        title={studio.name}
                        description="Studio"
                        to={`/studio/${studio.slug}`}
                    />
                )}
            />
            <GlobalSearchSection
                entity="playlist"
                title="Playlists"
                results={playlistResults}
                renderSummaryCard={(playlist) => (
                    <PlaylistSummaryCard key={playlist.id} playlist={playlist} playlistWithOwner={playlist} />
                )}
            />
        </>
    );
}

interface GlobalSearchSectionProps<T> {
    entity: string;
    title: string;
    results: Array<T>;
    renderSummaryCard: (result: T) => ReactNode;
}

function GlobalSearchSection<T>({ entity, title, results, renderSummaryCard }: GlobalSearchSectionProps<T>) {
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
            <Column style={{ "--gap": "16px" }}>{resultsPreview.map(renderSummaryCard)}</Column>
            {hasMoreResults && (
                <Row style={{ "--justify-content": "center" }}>
                    <Button asChild variant="silent" isCircle title="See all results">
                        <Link href={{ pathname: `/search/${entity}`, query: urlParams }}>
                            <Icon icon={faChevronDown} />
                        </Link>
                    </Button>
                </Row>
            )}
        </>
    );
}
