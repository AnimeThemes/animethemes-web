import styled from "styled-components";
import type { GetStaticProps } from "next";
import Link from "next/link";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

import {
    faArrowRight,
    faAward,
    faBookOpenCover,
    faMegaphone,
    faRandom,
    faSearch,
    faTv,
    faUser,
} from "@fortawesome/pro-solid-svg-icons";
import gql from "graphql-tag";
import { range } from "lodash-es";
import useSWR from "swr";

import { Column } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { AnnouncementCard } from "@/components/card/AnnouncementCard";
import PlaylistSummaryCard from "@/components/card/PlaylistSummaryCard";
import {
    VideoSummaryCard,
    VideoSummaryCardFragmentEntry,
    VideoSummaryCardFragmentVideo,
} from "@/components/card/VideoSummaryCard";
import { ShuffleDialog } from "@/components/dialog/ShuffleDialog";
import { ExternalLink } from "@/components/external-link/ExternalLink";
import { FeaturedTheme } from "@/components/featured-theme/FeaturedTheme";
import { Icon } from "@/components/icon/Icon";
import { ProfileImage } from "@/components/image/ProfileImage";
import { SEO } from "@/components/seo/SEO";
import { Skeleton } from "@/components/skeleton/Skeleton";
import { Text } from "@/components/text/Text";
import type {
    HomePageMostViewedQuery,
    HomePageQuery,
    HomePageRecentlyAddedPlaylistsQuery,
    HomePageRecentlyAddedQuery,
} from "@/generated/graphql";
import useAuth from "@/hooks/useAuth";
import useCurrentSeason from "@/hooks/useCurrentSeason";
import { fetchDataClient } from "@/lib/client";
import { fetchData } from "@/lib/server";
import theme from "@/theme";
import getSharedPageProps from "@/utils/getSharedPageProps";
import serializeMarkdown from "@/utils/serializeMarkdown";

const BigButton = styled(Button)`
    justify-content: flex-end;
    height: var(--height, 64px);
    border-radius: 0.5rem;
    gap: 8px;
    overflow: hidden;
`;

const BigIcon = styled(Icon)`
    margin: 0 auto -16px -32px;

    font-size: 56px;
    color: ${theme.colors["text-disabled"]};
`;

const BigProfileImage = styled(ProfileImage)`
    margin: 0 auto 0 -16px;
    border-radius: 0 9999px 9999px 0;
`;

const Grid = styled.div<{ $columns: number }>`
    display: grid;
    grid-template-columns: repeat(${(props) => props.$columns}, 1fr);
    grid-gap: 24px;

    @media (max-width: ${theme.breakpoints.mobileMax}) {
        grid-template-columns: 1fr;
    }
`;

interface HomePageProps {
    featuredTheme: NonNullable<NonNullable<HomePageQuery["featuredTheme"]>["entry"]>["theme"] | null;
    announcementSources: MDXRemoteSerializeResult[];
}

export default function HomePage({ featuredTheme, announcementSources }: HomePageProps) {
    const { me } = useAuth();
    const { currentYear, currentSeason } = useCurrentSeason();

    const { data: recentlyAdded } = useSWR<HomePageRecentlyAddedQuery["videoAll"] | null[]>(
        ["HomePageRecentlyAdded"],
        async () => {
            const { data } = await fetchDataClient<HomePageRecentlyAddedQuery>(gql`
                ${VideoSummaryCardFragmentVideo}
                ${VideoSummaryCardFragmentEntry}

                query HomePageRecentlyAdded {
                    videoAll(orderBy: "id", orderDesc: true, limit: 10) {
                        ...VideoSummaryCardVideo
                        entries {
                            ...VideoSummaryCardEntry
                        }
                    }
                }
            `);

            return data.videoAll;
        },
        { fallbackData: range(10).map(() => null) },
    );

    const { data: mostViewed } = useSWR<HomePageMostViewedQuery["videoAll"] | null[]>(
        ["HomePageTrending"],
        async () => {
            const { data } = await fetchDataClient<HomePageMostViewedQuery>(gql`
                ${VideoSummaryCardFragmentVideo}
                ${VideoSummaryCardFragmentEntry}

                query HomePageMostViewed {
                    videoAll(orderBy: "views_count", orderDesc: true, limit: 10) {
                        ...VideoSummaryCardVideo
                        entries {
                            ...VideoSummaryCardEntry
                        }
                    }
                }
            `);

            return data.videoAll;
        },
        { fallbackData: range(10).map(() => null) },
    );

    const { data: recentlyAddedPlaylists } = useSWR<HomePageRecentlyAddedPlaylistsQuery["playlistAll"] | null[]>(
        ["HomePageRecentlyAddedPlaylists"],
        async () => {
            const { data } = await fetchDataClient<HomePageRecentlyAddedPlaylistsQuery>(gql`
                ${PlaylistSummaryCard.fragments.playlist}
                ${PlaylistSummaryCard.fragments.showOwner}

                query HomePageRecentlyAddedPlaylists {
                    playlistAll(orderBy: "created_at", orderDesc: true, limit: 10, onlyNonEmpty: true) {
                        ...PlaylistSummaryCardPlaylist
                        ...PlaylistSummaryCardShowOwner
                    }
                }
            `);

            return data.playlistAll;
        },
        { fallbackData: range(10).map(() => null) },
    );

    return (
        <>
            <SEO />
            <Text variant="h1">Welcome, to AnimeThemes.moe!</Text>

            {announcementSources.length > 0 ? <AnnouncementCard announcementSource={announcementSources[0]} /> : null}

            {featuredTheme ? (
                <>
                    <Text variant="h2">Featured Theme</Text>
                    <FeaturedTheme theme={featuredTheme} />
                </>
            ) : null}

            <Text variant="h2">Explore The Database</Text>

            <Grid $columns={3}>
                <Link href="/search" passHref legacyBehavior>
                    <BigButton forwardedAs="a">
                        <BigIcon icon={faSearch} className="fa-flip-horizontal" />
                        <Text>Search</Text>
                        <Icon icon={faArrowRight} color="text-primary" />
                    </BigButton>
                </Link>
                <ShuffleDialog
                    trigger={
                        <BigButton>
                            <BigIcon icon={faRandom} />
                            <Text>Shuffle</Text>
                            <Icon icon={faArrowRight} color="text-primary" />
                        </BigButton>
                    }
                />
                <Link
                    href={currentYear && currentSeason ? `/year/${currentYear}/${currentSeason}` : "/"}
                    passHref
                    legacyBehavior
                >
                    <BigButton forwardedAs="a">
                        <BigIcon icon={faTv} />
                        <Text>Current Season</Text>
                        <Icon icon={faArrowRight} color="text-primary" />
                    </BigButton>
                </Link>
            </Grid>

            <Grid $columns={4}>
                <Link href="/event" passHref legacyBehavior>
                    <BigButton forwardedAs="a">
                        <BigIcon icon={faAward} />
                        <Text>Events</Text>
                        <Icon icon={faArrowRight} color="text-primary" />
                    </BigButton>
                </Link>
                <Link href="/wiki" passHref legacyBehavior>
                    <BigButton forwardedAs="a">
                        <BigIcon icon={faBookOpenCover} />
                        <Text>Wiki</Text>
                        <Icon icon={faArrowRight} color="text-primary" />
                    </BigButton>
                </Link>
                <Link href="/blog" passHref legacyBehavior>
                    <BigButton forwardedAs="a">
                        <BigIcon icon={faMegaphone} />
                        <Text>Blog</Text>
                        <Icon icon={faArrowRight} color="text-primary" />
                    </BigButton>
                </Link>
                <Link href="/profile" passHref legacyBehavior>
                    <BigButton forwardedAs="a">
                        {me.user ? <BigProfileImage user={me.user} size={96} /> : <BigIcon icon={faUser} />}
                        <Text>My Profile</Text>
                        <Icon icon={faArrowRight} color="text-primary" />
                    </BigButton>
                </Link>
            </Grid>

            <Grid $columns={3}>
                <Column style={{ "--gap": "24px" }}>
                    <Text variant="h2">Recently Added</Text>
                    <Column style={{ "--gap": "16px" }}>
                        {recentlyAdded?.map((video, index) => (
                            <Skeleton key={index} variant="summary-card" delay={index * 100}>
                                {video ? <VideoSummaryCard video={video} entry={video.entries[0]} /> : null}
                            </Skeleton>
                        ))}
                    </Column>
                </Column>
                <Column style={{ "--gap": "24px" }}>
                    <Text variant="h2">Most Viewed</Text>
                    <Column style={{ "--gap": "16px" }}>
                        {mostViewed?.map((video, index) => (
                            <Skeleton key={index} variant="summary-card" delay={index * 100}>
                                {video ? <VideoSummaryCard video={video} entry={video.entries[0]} /> : null}
                            </Skeleton>
                        ))}
                    </Column>
                </Column>
                <Column style={{ "--gap": "24px" }}>
                    <Text variant="h2">New Playlists</Text>
                    <Column style={{ "--gap": "16px" }}>
                        {recentlyAddedPlaylists?.map((playlist, index) => (
                            <Skeleton key={index} variant="summary-card" delay={index * 100}>
                                {playlist ? <PlaylistSummaryCard playlist={playlist} showOwner /> : null}
                            </Skeleton>
                        ))}
                    </Column>
                </Column>
            </Grid>

            <Text variant="h2">About The Project</Text>
            <Text as="p">
                A simple and consistent repository of anime opening and ending themes. We provide high quality WebMs of
                your favorite OPs and EDs for your listening and discussion needs.
            </Text>
            <Text as="p">
                <span>
                    This page is still actively being worked on. If you are a developer and interested in contributing
                    feel free to contact us on{" "}
                </span>
                <ExternalLink href="https://discordapp.com/invite/m9zbVyQ">Discord</ExternalLink>
                <span>.</span>
            </Text>
            <Text as="p">
                <span>The source code for this page can be found on </span>
                <ExternalLink href="https://github.com/AnimeThemes/animethemes-web">GitHub</ExternalLink>
                <span>. For our other open source projects we also have a </span>
                <ExternalLink href="https://github.com/AnimeThemes">GitHub organization</ExternalLink>
                <span>.</span>
            </Text>

            <Text variant="h2">Dive Deeper</Text>

            <Grid $columns={5}>
                <Link href="/anime" passHref legacyBehavior>
                    <BigButton forwardedAs="a" style={{ "--height": "48px" }}>
                        <Text>Anime Index</Text>
                        <Icon icon={faArrowRight} color="text-primary" />
                    </BigButton>
                </Link>
                <Link href="/artist" passHref legacyBehavior>
                    <BigButton forwardedAs="a" style={{ "--height": "48px" }}>
                        <Text>Artist Index</Text>
                        <Icon icon={faArrowRight} color="text-primary" />
                    </BigButton>
                </Link>
                <Link href="/year" passHref legacyBehavior>
                    <BigButton forwardedAs="a" style={{ "--height": "48px" }}>
                        <Text>Year Index</Text>
                        <Icon icon={faArrowRight} color="text-primary" />
                    </BigButton>
                </Link>
                <Link href="/series" passHref legacyBehavior>
                    <BigButton forwardedAs="a" style={{ "--height": "48px" }}>
                        <Text>Series Index</Text>
                        <Icon icon={faArrowRight} color="text-primary" />
                    </BigButton>
                </Link>
                <Link href="/studio" passHref legacyBehavior>
                    <BigButton forwardedAs="a" style={{ "--height": "48px" }}>
                        <Text>Studio Index</Text>
                        <Icon icon={faArrowRight} color="text-primary" />
                    </BigButton>
                </Link>
            </Grid>
        </>
    );
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
    const { data, apiRequests } = await fetchData<HomePageQuery>(gql`
        ${FeaturedTheme.fragments.theme}

        query HomePage {
            featuredTheme {
                entry {
                    theme {
                        ...FeaturedThemeTheme
                    }
                }
            }
            announcementAll {
                content
            }
        }
    `);

    return {
        props: {
            ...getSharedPageProps(apiRequests),
            featuredTheme: data?.featuredTheme?.entry?.theme ?? null,
            announcementSources: await Promise.all(
                data?.announcementAll.map(
                    async (announcement) => (await serializeMarkdown(announcement.content)).source,
                ),
            ),
        },
    };
};
