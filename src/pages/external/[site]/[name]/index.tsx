import { memo, useMemo, useState } from "react";
import styled from "styled-components";
import type { GetServerSideProps } from "next";

import { faStar } from "@fortawesome/pro-solid-svg-icons";
import gql from "graphql-tag";
import type { ParsedUrlQuery } from "querystring";
import useSWR from "swr";

import { Column, Row } from "@/components/box/Flex";
import { FilterToggleButton } from "@/components/button/FilterToggleButton";
import { AnimeSummaryCard } from "@/components/card/AnimeSummaryCard";
import { SidebarContainer } from "@/components/container/SidebarContainer";
import { DescriptionList } from "@/components/description-list/DescriptionList";
import { Icon } from "@/components/icon/Icon";
import { MultiCoverImage } from "@/components/image/MultiCoverImage";
import { SearchFilterGroup } from "@/components/search-filter/SearchFilterGroup";
import { SearchFilterSortBy } from "@/components/search-filter/SearchFilterSortBy";
import { SEO } from "@/components/seo/SEO";
import { Text } from "@/components/text/Text";
import { Collapse } from "@/components/utils/Collapse";
import type {
    ExternalProfilePageExternalProfileQuery,
    ExternalProfilePageExternalProfileQueryVariables,
    ExternalProfilePageQuery,
    ExternalProfilePageQueryVariables,
    ExternalProfileSite,
} from "@/generated/graphql";
import useToggle from "@/hooks/useToggle";
import { fetchDataClient } from "@/lib/client";
import { fetchData } from "@/lib/server";
import theme from "@/theme/index";
import {
    ANIME_A_Z,
    ANIME_NEW_OLD,
    ANIME_OLD_NEW,
    ANIME_Z_A,
    either,
    getComparator,
    sortTransformed,
} from "@/utils/comparators";
import type { SharedPageProps } from "@/utils/getSharedPageProps";
import getSharedPageProps from "@/utils/getSharedPageProps";
import type { Comparator } from "@/utils/types";

const SITE_MAPPINGS: Record<string, ExternalProfileSite> = {
    al: "AniList",
    anilist: "AniList",
    mal: "MyAnimeList",
    myanimelist: "MyAnimeList",
};

const StyledDesktopOnly = styled.div`
    gap: 24px;

    @media (max-width: ${theme.breakpoints.mobileMax}) {
        display: none;
    }
`;

const SCORE_ASC = "score-asc";
const SCORE_DESC = "score-desc";
const FAVORITES_FIRST = "favorites-first";

const comparators = {
    [ANIME_A_Z]: sortTransformed(getComparator(ANIME_A_Z), (entry) => entry.anime),
    [ANIME_Z_A]: sortTransformed(getComparator(ANIME_Z_A), (entry) => entry.anime),
    [ANIME_OLD_NEW]: sortTransformed(getComparator(ANIME_OLD_NEW), (entry) => entry.anime),
    [ANIME_NEW_OLD]: sortTransformed(getComparator(ANIME_NEW_OLD), (entry) => entry.anime),
    [SCORE_ASC]: (a, b) => a.score - b.score,
    [SCORE_DESC]: (a, b) => b.score - a.score,
    [FAVORITES_FIRST]: (a, b) => (b.is_favorite ? 1 : 0) - (a.is_favorite ? 1 : 0),
} satisfies Record<string, Comparator<ExternalProfilePageQuery["externalProfileAll"][number]["entries"][number]>>;

type ExternalProfilePageProps = SharedPageProps & {
    externalProfile: ExternalProfilePageQuery["externalProfileAll"][number];
};

interface ExternalProfilePageParams extends ParsedUrlQuery {
    name: string;
    site: ExternalProfileSite;
}

export default function ExternalProfilePage({ externalProfile: initialExternalProfile }: ExternalProfilePageProps) {
    const { data: externalProfile } = useSWR(
        ["ExternalProfilePageExternalProfile", `/api/externalprofile/${initialExternalProfile.id}`],
        async () => {
            const { data } = await fetchDataClient<
                ExternalProfilePageExternalProfileQuery,
                ExternalProfilePageExternalProfileQueryVariables
            >(
                gql`
                    ${ExternalProfilePage.fragments.externalProfile}

                    query ExternalProfilePageExternalProfile($externalProfileId: Int!) {
                        externalProfile(id: $externalProfileId) {
                            ...ExternalProfilePageExternalProfile
                        }
                    }
                `,
                { externalProfileId: initialExternalProfile.id },
            );

            if (!data.externalProfile) {
                location.reload();
                throw new Error("External profile was removed or user lost auth.");
            }

            return data.externalProfile;
        },
        { fallbackData: initialExternalProfile },
    );

    const favorites = useMemo(
        () => externalProfile.entries.filter((entry) => entry.is_favorite),
        [externalProfile.entries],
    );

    const entriesFiltered = useMemo(
        () => externalProfile.entries.filter((entry) => entry.watch_status === "Completed"),
        [externalProfile.entries],
    );

    // For the cover image we want to show the user's favorites.
    // If there aren't enough favorites we resort to the entries with the highest score.
    const coverImageAnime = useMemo(
        () =>
            entriesFiltered
                .sort(either(comparators[FAVORITES_FIRST]).or(comparators[SCORE_DESC]).chain())
                .map((entry) => entry.anime),
        [entriesFiltered],
    );

    return (
        <>
            <SEO title={externalProfile.name} />
            <Text variant="h1">{externalProfile.name}</Text>
            <SidebarContainer>
                <Column style={{ "--gap": "24px" }}>
                    <StyledDesktopOnly>
                        <MultiCoverImage resourcesWithImages={coverImageAnime} />
                    </StyledDesktopOnly>
                    <DescriptionList>
                        <DescriptionList.Item title="Links">
                            <Text link>{externalProfile.site}</Text>
                        </DescriptionList.Item>
                    </DescriptionList>
                </Column>
                <Column style={{ "--gap": "24px" }}>
                    {favorites.length > 0 && <ExternalProfileEntryList title="Favorites" entries={favorites} />}
                    <ExternalProfileEntryList title="All Anime" entries={entriesFiltered} />
                </Column>
            </SidebarContainer>
        </>
    );
}

interface ExternalProfileEntryListProps {
    title: string;
    entries: ExternalProfilePageProps["externalProfile"]["entries"];
}

const ExternalProfileEntryList = memo(function SeriesAnime({ title, entries }: ExternalProfileEntryListProps) {
    const [showFilter, toggleShowFilter] = useToggle();
    const [sortBy, setSortBy] = useState<keyof typeof comparators>(SCORE_DESC);

    const entriesSorted = useMemo(
        () => [...entries].filter((entry) => entry.watch_status === "Completed").sort(comparators[sortBy]),
        [entries, sortBy],
    );

    return (
        <>
            <Row style={{ "--justify-content": "space-between", "--align-items": "center" }}>
                <Text variant="h2">
                    {title}
                    <Text color="text-disabled"> ({entries.length})</Text>
                </Text>
                <FilterToggleButton onClick={toggleShowFilter} />
            </Row>
            <Collapse collapse={!showFilter}>
                <SearchFilterGroup>
                    <SearchFilterSortBy value={sortBy} setValue={setSortBy}>
                        <SearchFilterSortBy.Option value={SCORE_DESC}>Score (High ➜ Low)</SearchFilterSortBy.Option>
                        <SearchFilterSortBy.Option value={SCORE_ASC}>Score (Low ➜ High)</SearchFilterSortBy.Option>
                        <SearchFilterSortBy.Option value={ANIME_A_Z}>A ➜ Z</SearchFilterSortBy.Option>
                        <SearchFilterSortBy.Option value={ANIME_Z_A}>Z ➜ A</SearchFilterSortBy.Option>
                        <SearchFilterSortBy.Option value={ANIME_OLD_NEW}>Old ➜ New</SearchFilterSortBy.Option>
                        <SearchFilterSortBy.Option value={ANIME_NEW_OLD}>New ➜ Old</SearchFilterSortBy.Option>
                    </SearchFilterSortBy>
                </SearchFilterGroup>
            </Collapse>
            <Column style={{ "--gap": "16px" }}>
                {entriesSorted.map((entry) => (
                    <AnimeSummaryCard key={entry.anime.slug} anime={entry.anime} expandable>
                        {entry.score > 0 && (
                            <Text variant="small" color={"gold"} noWrap title="Score">
                                <Icon icon={faStar} /> {entry.score}
                            </Text>
                        )}
                    </AnimeSummaryCard>
                ))}
            </Column>
        </>
    );
});

ExternalProfilePage.fragments = {
    externalProfile: gql`
        ${AnimeSummaryCard.fragments.anime}
        ${AnimeSummaryCard.fragments.expandable}

        fragment ExternalProfilePageExternalProfile on ExternalProfile {
            id
            name
            site
            visibility
            entries {
                watch_status
                is_favorite
                score
                anime {
                    ...AnimeSummaryCardAnime
                    ...AnimeSummaryCardAnimeExpandable
                }
            }
        }
    `,
};

export const getServerSideProps: GetServerSideProps<ExternalProfilePageProps, ExternalProfilePageParams> = async ({
    params,
    req,
}) => {
    if (!params) {
        return { notFound: true };
    }

    const site = SITE_MAPPINGS[params.site.toLowerCase()];

    if (!site) {
        return { notFound: true };
    }

    const { data, apiRequests } = await fetchData<ExternalProfilePageQuery, ExternalProfilePageQueryVariables>(
        gql`
            ${ExternalProfilePage.fragments.externalProfile}

            query ExternalProfilePage($name: String!, $site: ExternalProfileSite!) {
                externalProfileAll(name: $name, site: $site) {
                    ...ExternalProfilePageExternalProfile
                }
            }
        `,
        { name: params.name, site: site },
        { req },
    );

    if (!data.externalProfileAll.length) {
        return { notFound: true };
    }

    return {
        props: {
            ...getSharedPageProps(apiRequests),
            externalProfile: data.externalProfileAll[0],
        },
    };
};
