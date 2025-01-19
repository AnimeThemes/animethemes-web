import styled from "styled-components";
import type { GetStaticProps } from "next";
import Link from "next/link";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

import {
    faArrowRight,
    faAward,
    faBookOpen,
    faBullhorn,
    faMagnifyingGlass,
    faShuffle,
    faTv,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import gql from "graphql-tag";

import { Column } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { AnnouncementCard } from "@/components/card/AnnouncementCard";
import { ShuffleDialog } from "@/components/dialog/ShuffleDialog";
import { ExternalLink } from "@/components/external-link/ExternalLink";
import { FeaturedTheme } from "@/components/featured-theme/FeaturedTheme";
import { MostViewedVideos } from "@/components/home/MostViewedVideos";
import { RecentlyAddedPlaylists } from "@/components/home/RecentlyAddedPlaylists";
import { RecentlyAddedVideos } from "@/components/home/RecentlyAddedVideos";
import { Icon } from "@/components/icon/Icon";
import { ProfileImage } from "@/components/image/ProfileImage";
import { SEO } from "@/components/seo/SEO";
import { Text } from "@/components/text/Text";
import type { HomePageQuery } from "@/generated/graphql";
import useAuth from "@/hooks/useAuth";
import useCurrentSeason from "@/hooks/useCurrentSeason";
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
                <BigButton asChild>
                    <Link href="/search">
                        <BigIcon icon={faMagnifyingGlass} className="fa-flip-horizontal" />
                        <Text>Search</Text>
                        <Icon icon={faArrowRight} color="text-primary" />
                    </Link>
                </BigButton>
                <ShuffleDialog
                    trigger={
                        <BigButton>
                            <BigIcon icon={faShuffle} />
                            <Text>Shuffle</Text>
                            <Icon icon={faArrowRight} color="text-primary" />
                        </BigButton>
                    }
                />
                <BigButton asChild>
                    <Link href={currentYear && currentSeason ? `/year/${currentYear}/${currentSeason}` : "/"}>
                        <BigIcon icon={faTv} />
                        <Text>Current Season</Text>
                        <Icon icon={faArrowRight} color="text-primary" />
                    </Link>
                </BigButton>
            </Grid>

            <Grid $columns={4}>
                <BigButton asChild>
                    <Link href="/event">
                        <BigIcon icon={faAward} />
                        <Text>Events</Text>
                        <Icon icon={faArrowRight} color="text-primary" />
                    </Link>
                </BigButton>
                <BigButton asChild>
                    <Link href="/wiki">
                        <BigIcon icon={faBookOpen} />
                        <Text>Wiki</Text>
                        <Icon icon={faArrowRight} color="text-primary" />
                    </Link>
                </BigButton>
                <BigButton asChild>
                    <Link href="/blog">
                        <BigIcon icon={faBullhorn} />
                        <Text>Blog</Text>
                        <Icon icon={faArrowRight} color="text-primary" />
                    </Link>
                </BigButton>
                <BigButton asChild>
                    <Link href="/profile">
                        {me.user ? <BigProfileImage user={me.user} size={96} /> : <BigIcon icon={faUser} />}
                        <Text>My Profile</Text>
                        <Icon icon={faArrowRight} color="text-primary" />
                    </Link>
                </BigButton>
            </Grid>

            <Grid $columns={3}>
                <Column style={{ "--gap": "24px" }}>
                    <Text variant="h2">Recently Added</Text>
                    <RecentlyAddedVideos />
                </Column>
                <Column style={{ "--gap": "24px" }}>
                    <Text variant="h2">Most Viewed</Text>
                    <MostViewedVideos />
                </Column>
                <Column style={{ "--gap": "24px" }}>
                    <Text variant="h2">New Playlists</Text>
                    <RecentlyAddedPlaylists />
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
                <BigButton asChild style={{ "--height": "48px" }}>
                    <Link href="/anime">
                        <Text>Anime Index</Text>
                        <Icon icon={faArrowRight} color="text-primary" />
                    </Link>
                </BigButton>
                <BigButton asChild style={{ "--height": "48px" }}>
                    <Link href="/artist">
                        <Text>Artist Index</Text>
                        <Icon icon={faArrowRight} color="text-primary" />
                    </Link>
                </BigButton>
                <BigButton asChild style={{ "--height": "48px" }}>
                    <Link href="/year">
                        <Text>Year Index</Text>
                        <Icon icon={faArrowRight} color="text-primary" />
                    </Link>
                </BigButton>
                <BigButton asChild style={{ "--height": "48px" }}>
                    <Link href="/series">
                        <Text>Series Index</Text>
                        <Icon icon={faArrowRight} color="text-primary" />
                    </Link>
                </BigButton>
                <BigButton asChild style={{ "--height": "48px" }}>
                    <Link href="/studio">
                        <Text>Studio Index</Text>
                        <Icon icon={faArrowRight} color="text-primary" />
                    </Link>
                </BigButton>
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
