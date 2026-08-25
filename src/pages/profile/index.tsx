import { memo, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import type { GetServerSideProps } from "next";

import { useMutation, useQuery } from "@apollo/client/react";
import {
    faCircleExclamation,
    faEllipsisVertical,
    faRightFromBracket,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { isAxiosError } from "axios";

import { Column, Row } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { IconTextButton } from "@/components/button/IconTextButton";
import { Card } from "@/components/card/Card";
import PlaylistSummaryCard from "@/components/card/PlaylistSummaryCard";
import { VideoSummaryCard } from "@/components/card/VideoSummaryCard";
import { LoginDialog } from "@/components/dialog/LoginDialog";
import { PasswordChangeDialog } from "@/components/dialog/PasswordChangeDialog";
import { PlaylistAddDialog } from "@/components/dialog/PlaylistAddDialog";
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
import createApolloClient from "@/graphql/createApolloClient";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";
import useAuth from "@/hooks/useAuth";
import useSetting from "@/hooks/useSetting";
import { handleAxiosError } from "@/lib/client/axios";
import theme from "@/theme";
import type { SharedPageProps } from "@/utils/getSharedPageProps";
import getSharedPageProps from "@/utils/getSharedPageProps";
import { ColorTheme, FeaturedThemePreview, ShowAnnouncements } from "@/utils/settings";

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

export const PROFILE_PAGE_ME = graphql(`
    fragment ProfilePageMe on Me {
        ...ProfileImageUser
        id
        name
        email
        emailVerifiedAt
        createdAt
        roles {
            id
            name
            color
            priority
            default
        }
        playlists(sort: [CREATED_AT_DESC]) {
            ...PlaylistSummaryCardPlaylist
            ...PlaylistRemoveDialogPlaylist
            id
        }
        watchHistory {
            ...WatchHistoryThemesWatchHistory
        }
    }
`);

export const PROFILE_PAGE = graphql(`
    query ProfilePage {
        me {
            ...ProfilePageMe
        }
    }
`);

interface ProfilePageProps extends SharedPageProps {
    me: FragmentType<typeof PROFILE_PAGE_ME> | null;
}

export default function ProfilePage({ me: meFragment }: ProfilePageProps) {
    const { data } = useQuery(PROFILE_PAGE);

    const me = getFragmentData(PROFILE_PAGE_ME, data?.me ?? meFragment);

    const [clearHistory] = useMutation(
        graphql(`
            mutation ClearWatchHistory {
                clearWatchHistory
            }
        `),
        {
            refetchQueries: [PROFILE_PAGE],
        },
    );

    const [showAnnouncements, setShowAnnouncements] = useSetting(ShowAnnouncements);
    const [featuredThemePreview, setFeaturedThemePreview] = useSetting(FeaturedThemePreview);
    const [colorTheme, setColorTheme] = useSetting(ColorTheme);

    const roles = (me?.roles ?? [])
        .filter((role) => !role.default)
        .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
    const highlightColor = roles[0]?.color ?? "";

    const [currentTime, setCurrentTime] = useState<number>(() => Date.now());

    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => setCurrentTime(Date.now()), []);

    const isNewUser = !!me?.createdAt && (currentTime - Date.parse(me.createdAt)) / (1000 * 60 * 60 * 24) < 1;

    return (
        <>
            <SEO title="My Profile" />
            {me ? (
                <>
                    <StyledProfileImageBackground user={me} />
                    <StyledHeaderTop>
                        <StyledProfileImage user={me} size={128} $borderColor={highlightColor} />
                        <Column>
                            <Text variant="h1">
                                Welcome {isNewUser ? "on AnimeThemes" : "back"},{" "}
                                <StyledUsername $color={highlightColor}>{me.name}</StyledUsername>!
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
                    {!me.emailVerifiedAt ? (
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
            {!me ? (
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
                    {me?.playlists ? (
                        <Column style={{ "--gap": "24px" }}>
                            <StyledHeader>
                                <Text variant="h2">Playlists</Text>
                                <PlaylistAddDialog />
                            </StyledHeader>
                            <Column style={{ "--gap": "16px" }}>
                                {me.playlists.length ? (
                                    me.playlists.map((playlist) => (
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
                    {me ? (
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
                </Column>
                <Column style={{ "--gap": "24px" }}>
                    <StyledHeader>
                        <Text variant="h2">Recently Watched</Text>
                        {me ? (
                            <IconTextButton icon={faTrash} collapsible onClick={() => clearHistory()}>
                                Clear
                            </IconTextButton>
                        ) : null}
                    </StyledHeader>
                    {me ? (
                        <Column style={{ "--gap": "16px" }}>
                            <WatchHistoryThemes history={me.watchHistory} />
                        </Column>
                    ) : (
                        <Text>Log in to see your watch history.</Text>
                    )}
                </Column>
            </StyledProfileGrid>
        </>
    );
}

export const WATCH_HISTORY_THEMES_WATCH_HISTORY = graphql(`
    fragment WatchHistoryThemesWatchHistory on WatchHistory {
        animethemeentry {
            id
            ...VideoSummaryCardEntry
            animetheme {
                ...VideoSummaryCardTheme
            }
        }
        video {
            id
            ...VideoSummaryCardVideo
        }
    }
`);

interface WatchHistoryThemesProps {
    history: Array<FragmentType<typeof WATCH_HISTORY_THEMES_WATCH_HISTORY>>;
}

const WatchHistoryThemes = memo(function WatchHistoryThemes({ history: historyFragment }: WatchHistoryThemesProps) {
    const history = getFragmentData(WATCH_HISTORY_THEMES_WATCH_HISTORY, historyFragment);

    return (
        <>
            {[...history].reverse().map(({ animethemeentry: entry, video }) => (
                <VideoSummaryCard
                    key={`${entry.id}-${video.id}`}
                    theme={entry.animetheme}
                    entry={entry}
                    video={video}
                />
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

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async ({ req }) => {
    const client = createApolloClient(req);

    try {
        const { data } = await client.query({
            query: PROFILE_PAGE,
        });

        return {
            props: {
                ...getSharedPageProps(),
                me: data.me,
            },
        };
    } catch (e) {
        console.log(JSON.stringify(e, null, 2));

        return { notFound: true };
    }
};
