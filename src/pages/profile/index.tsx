import { memo, useState } from "react";
import styled, { css } from "styled-components";
import type { GetServerSideProps } from "next";

import {
    faCircleExclamation,
    faEllipsisVertical,
    faPen,
    faRightFromBracket,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { isAxiosError } from "axios";
import gql from "graphql-tag";
import useSWR from "swr";

import { Column, Row } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { IconTextButton } from "@/components/button/IconTextButton";
import { Card } from "@/components/card/Card";
import PlaylistSummaryCard from "@/components/card/PlaylistSummaryCard";
import { SummaryCard } from "@/components/card/SummaryCard";
import { ThemeSummaryCard } from "@/components/card/ThemeSummaryCard";
import { LoginDialog } from "@/components/dialog/LoginDialog";
import { PasswordChangeDialog } from "@/components/dialog/PasswordChangeDialog";
import { PlaylistAddDialog } from "@/components/dialog/PlaylistAddDialog";
import { PlaylistEditDialog } from "@/components/dialog/PlaylistEditDialog";
import { PlaylistRemoveDialog } from "@/components/dialog/PlaylistRemoveDialog";
import { RegisterDialog } from "@/components/dialog/RegisterDialog";
import { UserInformationDialog } from "@/components/dialog/UserInformationDialog";
import { Icon } from "@/components/icon/Icon";
import { ProfileImage } from "@/components/image/ProfileImage";
import { Listbox, ListboxOption } from "@/components/listbox/Listbox";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "@/components/menu/Menu";
import { SearchFilter } from "@/components/search-filter/SearchFilter";
import { SearchFilterGroup } from "@/components/search-filter/SearchFilterGroup";
import { SEO } from "@/components/seo/SEO";
import { Text } from "@/components/text/Text";
import { Busy } from "@/components/utils/Busy";
import type { ProfilePageMeQuery, ProfilePageQuery } from "@/generated/graphql";
import useAuth from "@/hooks/useAuth";
import useLocalPlaylist from "@/hooks/useLocalPlaylist";
import useSetting from "@/hooks/useSetting";
import type { WatchHistory } from "@/hooks/useWatchHistory";
import useWatchHistory from "@/hooks/useWatchHistory";
import { fetchDataClient } from "@/lib/client";
import { handleAxiosError } from "@/lib/client/axios";
import { fetchData } from "@/lib/server";
import theme from "@/theme";
import type { SharedPageProps } from "@/utils/getSharedPageProps";
import getSharedPageProps from "@/utils/getSharedPageProps";
import { ColorTheme, FeaturedThemePreview, ShowAnnouncements } from "@/utils/settings";
import type { RequiredNonNullable } from "@/utils/types";

const StyledProfileGrid = styled.div`
    --columns: 2;

    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
    grid-gap: 24px 128px;

    @media (max-width: ${theme.breakpoints.mobileMax}) {
        --columns: 1;
    }
`;

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledHeaderTop = styled(StyledHeader)`
    isolation: isolate;
    padding: 32px 0;
    gap: 32px;
    text-align: center;

    @media (min-width: ${theme.breakpoints.tabletMin}) {
        & > :last-child {
            margin-left: auto;
        }
    }

    @media (max-width: ${theme.breakpoints.mobileMax}) {
        flex-direction: column;
        gap: 16px;
    }
`;

const StyledProfileImage = styled(ProfileImage)<{ $borderColor?: string }>`
    width: 128px;
    height: 128px;
    border-radius: 9999px;

    ${(props) =>
        props.$borderColor &&
        css`
            box-shadow:
                0 0 0 4px ${props.$borderColor},
                0 0 10px 6px ${props.$borderColor}7F;
        `}
`;

const StyledUsername = styled.span<{ $color: string }>`
    color: ${(props) => props.$color};
    text-shadow: 0 0 4px ${(props) => props.$color}7F;
`;

const StyledProfileImageBackground = styled(ProfileImage)`
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 128px;
    object-fit: cover;
    opacity: 0.15;
    filter: blur(32px);
    transform: translateY(-64px);
`;

const StyledRoles = styled.div`
    display: flex;
    align-items: baseline;
    gap: 8px;

    @media (max-width: ${theme.breakpoints.mobileMax}) {
        justify-content: center;
    }
`;

const StyledRoleBadge = styled.span<{ $color: string }>`
    display: inline-block;
    padding: 2px 4px;
    border-radius: 4px;

    background-color: ${(props) => props.$color || "#FFFFFF"}3F;
    color: ${(props) => props.$color};

    font-size: 0.8rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
`;

type ProfilePageProps = SharedPageProps & RequiredNonNullable<ProfilePageQuery>;

export default function ProfilePage({ me: initialMe }: ProfilePageProps) {
    const { data: me } = useSWR(
        ["ProfilePageMe", "/api/me", "/api/me/playlist"],
        async () => {
            const { data } = await fetchDataClient<ProfilePageMeQuery>(gql`
                ${ProfilePage.fragments.playlist}
                ${ProfilePage.fragments.user}

                query ProfilePageMe {
                    me {
                        user {
                            ...ProfilePageUser
                        }
                        playlistAll {
                            ...ProfilePagePlaylist
                        }
                    }
                }
            `);

            return data.me;
        },
        { fallbackData: initialMe },
    );

    const { localPlaylist } = useLocalPlaylist();
    const { history, clearHistory } = useWatchHistory();

    const [showAnnouncements, setShowAnnouncements] = useSetting(ShowAnnouncements);
    const [featuredThemePreview, setFeaturedThemePreview] = useSetting(FeaturedThemePreview);
    const [colorTheme, setColorTheme] = useSetting(ColorTheme);

    const roles = (me.user?.roles ?? [])
        .filter((role) => !role.default)
        .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
    const highlightColor = roles[0]?.color ?? "";

    const isNewUser = !!me.user && (Date.now() - Date.parse(me.user.created_at)) / (1000 * 60 * 60 * 24) < 1;

    return (
        <>
            <SEO title="My Profile" />
            {me.user ? (
                <>
                    <StyledProfileImageBackground user={me.user} />
                    <StyledHeaderTop>
                        <StyledProfileImage user={me.user} size={128} $borderColor={highlightColor} />
                        <Column>
                            <Text variant="h1">
                                Welcome {isNewUser ? "on AnimeThemes" : "back"},{" "}
                                <StyledUsername $color={highlightColor}>{me.user.name}</StyledUsername>!
                            </Text>
                            <StyledRoles>
                                {roles.map((role) => (
                                    <StyledRoleBadge key={role.name} $color={role.color ?? ""}>
                                        {role.name}
                                    </StyledRoleBadge>
                                ))}
                            </StyledRoles>
                        </Column>
                        <LogoutButton />
                    </StyledHeaderTop>
                    {!me.user.email_verified_at ? (
                        <Card $color="text-warning">
                            <Column style={{ "--gap": "8px" }}>
                                <Text color="text-warning" weight="bold">
                                    <Icon icon={faCircleExclamation} /> Your email address is not verified!
                                </Text>
                                <Text>
                                    You haven&apos;t verified your email address, yet. Please do so to unlock all
                                    features.
                                </Text>
                                <Text>
                                    No email received? <ResendVerificationEmailLink />
                                </Text>
                            </Column>
                        </Card>
                    ) : null}
                </>
            ) : (
                <Text variant="h1">My Profile</Text>
            )}
            {!me.user ? (
                <Card>
                    <Column style={{ "--gap": "16px" }}>
                        <Text>
                            Share your favorite anime themes with others and more. Create your AnimeThemes account
                            today!
                        </Text>
                        <Row $wrap style={{ "--gap": "16px" }}>
                            <LoginDialog />
                            <RegisterDialog />
                        </Row>
                    </Column>
                </Card>
            ) : null}
            <StyledProfileGrid>
                <Column style={{ "--gap": "48px" }}>
                    {me.playlistAll ? (
                        <Column style={{ "--gap": "24px" }}>
                            <StyledHeader>
                                <Text variant="h2">Playlists</Text>
                                <PlaylistAddDialog />
                            </StyledHeader>
                            <Column style={{ "--gap": "16px" }}>
                                {me.playlistAll.length ? (
                                    me.playlistAll.map((playlist) => (
                                        <PlaylistSummaryCard
                                            key={playlist.id}
                                            playlist={playlist}
                                            menu={
                                                <Menu modal={false}>
                                                    <MenuTrigger asChild>
                                                        <Button variant="silent" isCircle>
                                                            <Icon icon={faEllipsisVertical} />
                                                        </Button>
                                                    </MenuTrigger>
                                                    <MenuContent>
                                                        <PlaylistEditDialog
                                                            playlist={playlist}
                                                            trigger={
                                                                <MenuItem onSelect={(event) => event.preventDefault()}>
                                                                    <Icon icon={faPen} />
                                                                    <Text>Edit Playlist</Text>
                                                                </MenuItem>
                                                            }
                                                        />
                                                        <PlaylistRemoveDialog
                                                            playlist={playlist}
                                                            trigger={
                                                                <MenuItem onSelect={(event) => event.preventDefault()}>
                                                                    <Icon icon={faTrash} />
                                                                    <Text>Delete Playlist</Text>
                                                                </MenuItem>
                                                            }
                                                        />
                                                    </MenuContent>
                                                </Menu>
                                            }
                                        />
                                    ))
                                ) : (
                                    <Text>You have not created a playlist, yet.</Text>
                                )}
                            </Column>
                        </Column>
                    ) : null}
                    {me.user ? (
                        <Column style={{ "--gap": "24px" }}>
                            <Text variant="h2">Account Settings</Text>
                            <Column style={{ "--gap": "16px" }}>
                                <UserInformationDialog />
                                <PasswordChangeDialog />
                            </Column>
                        </Column>
                    ) : null}
                    <Column style={{ "--gap": "24px" }}>
                        <Text variant="h2">Page Settings</Text>
                        <SearchFilterGroup>
                            <SearchFilter>
                                <Text>Color Theme</Text>
                                <Listbox value={colorTheme} onValueChange={setColorTheme}>
                                    <ListboxOption value={ColorTheme.SYSTEM}>System</ListboxOption>
                                    <ListboxOption value={ColorTheme.DARK}>Dark</ListboxOption>
                                    <ListboxOption value={ColorTheme.LIGHT}>Light</ListboxOption>
                                </Listbox>
                            </SearchFilter>
                            <SearchFilter>
                                <Text>Show Announcements</Text>
                                <Listbox value={showAnnouncements} onValueChange={setShowAnnouncements}>
                                    <ListboxOption value={ShowAnnouncements.ENABLED}>Enabled</ListboxOption>
                                    <ListboxOption value={ShowAnnouncements.DISABLED}>Disabled</ListboxOption>
                                </Listbox>
                            </SearchFilter>
                            <SearchFilter>
                                <Text>Featured Theme Preview</Text>
                                <Listbox value={featuredThemePreview} onValueChange={setFeaturedThemePreview}>
                                    <ListboxOption value={FeaturedThemePreview.VIDEO}>Video</ListboxOption>
                                    <ListboxOption value={FeaturedThemePreview.COVER}>Cover</ListboxOption>
                                    <ListboxOption value={FeaturedThemePreview.DISABLED}>Disabled</ListboxOption>
                                </Listbox>
                            </SearchFilter>
                        </SearchFilterGroup>
                    </Column>
                    <Column style={{ "--gap": "24px" }}>
                        <Text variant="h2">Legacy</Text>
                        <SummaryCard
                            title="Local Playlist"
                            description={`${localPlaylist.length} themes`}
                            to="/profile/playlist"
                        />
                    </Column>
                </Column>
                <Column style={{ "--gap": "24px" }}>
                    <StyledHeader>
                        <Text variant="h2">Recently Watched</Text>
                        <IconTextButton icon={faTrash} collapsible onClick={clearHistory}>
                            Clear
                        </IconTextButton>
                    </StyledHeader>
                    <Column style={{ "--gap": "16px" }}>
                        <WatchHistoryThemes themes={history} />
                    </Column>
                </Column>
            </StyledProfileGrid>
        </>
    );
}

interface WatchHistoryThemesProps {
    themes: WatchHistory;
}

const WatchHistoryThemes = memo(function WatchHistoryThemes({ themes }: WatchHistoryThemesProps) {
    return (
        <>
            {[...themes].reverse().map((theme) => (
                <ThemeSummaryCard key={theme.id} theme={theme} />
            ))}
        </>
    );
});

function LogoutButton() {
    const { logout } = useAuth();

    const [isBusy, setBusy] = useState(false);

    function performLogout() {
        setBusy(true);

        logout().finally(() => setBusy(false));
    }

    return (
        <IconTextButton icon={faRightFromBracket} onClick={performLogout}>
            <Busy isBusy={isBusy}>Logout</Busy>
        </IconTextButton>
    );
}

function ResendVerificationEmailLink() {
    const { resendEmailVerification } = useAuth();

    const [isBusy, setBusy] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [error, setError] = useState("");

    async function submit() {
        setBusy(true);
        setError("");

        try {
            await resendEmailVerification();
        } catch (error) {
            if (isAxiosError(error)) {
                setError(handleAxiosError(error));
            }

            return;
        } finally {
            setBusy(false);
        }

        setSuccess(true);
    }

    if (error) {
        return <Text color="text-warning">{error}</Text>;
    }

    if (isSuccess) {
        return <Text>Verification email was sent.</Text>;
    }

    return (
        <Text link onClick={submit}>
            <Busy isBusy={isBusy}>Click here to send a new verification email.</Busy>
        </Text>
    );
}

ProfilePage.fragments = {
    playlist: gql`
        ${PlaylistSummaryCard.fragments.playlist}

        fragment ProfilePagePlaylist on Playlist {
            ...PlaylistSummaryCardPlaylist
            id
        }
    `,
    user: gql`
        fragment ProfilePageUser on UserAuth {
            name
            email
            email_verified_at
            created_at
            roles {
                name
                color
                priority
                default
            }
        }
    `,
};

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async ({ req }) => {
    const { data, apiRequests } = await fetchData<ProfilePageQuery>(
        gql`
            ${ProfilePage.fragments.playlist}
            ${ProfilePage.fragments.user}

            query ProfilePage {
                me {
                    user {
                        ...ProfilePageUser
                    }
                    playlistAll {
                        ...ProfilePagePlaylist
                    }
                }
            }
        `,
        undefined,
        { req },
    );

    return {
        props: {
            ...getSharedPageProps(apiRequests),
            me: data.me,
        },
    };
};
