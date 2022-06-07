import styled from "styled-components";
import { SEO } from "components/seo";
import { Column } from "components/box";
import { Text } from "components/text";
import { SummaryCard, ThemeSummaryCard } from "components/card";
import { IconTextButton } from "components/button";
import { faKey, faTrash } from "@fortawesome/pro-solid-svg-icons";
import useWatchHistory from "hooks/useWatchHistory";
import useLocalPlaylist from "hooks/useLocalPlaylist";
import theme from "theme";
import { SearchFilter, SearchFilterGroup } from "components/search-filter";
import { Listbox } from "components/listbox";
import { ColorTheme, DeveloperMode, FeaturedThemePreview, RevalidationToken, ShowAnnouncements } from "utils/settings";
import useSetting from "hooks/useSetting";
import { Input } from "components/input";

const StyledProfileGrid = styled.div`
    --columns: 2;
    --rows: 2;
    
    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
    grid-template-rows: repeat(var(--rows), auto);
    grid-auto-flow: column;
    grid-gap: 16px 32px;
    
    @media (max-width: ${theme.breakpoints.mobileMax}) {
        --columns: 1;
        --rows: 4;
    }
`;

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export default function ProfilePage() {
    const { localPlaylist } = useLocalPlaylist();
    const { history, clearHistory } = useWatchHistory();

    const [showAnnouncements, setShowAnnouncements] = useSetting(ShowAnnouncements);
    const [featuredThemePreview, setFeaturedThemePreview] = useSetting(FeaturedThemePreview);
    const [developerMode, setDeveloperMode] = useSetting(DeveloperMode);
    const [revalidationToken, setRevalidationToken] = useSetting(RevalidationToken);
    const [colorTheme, setColorTheme] = useSetting(ColorTheme);

    return (
        <>
            <SEO title="My Profile"/>
            <Text variant="h1">My Profile</Text>
            <StyledProfileGrid>
                <StyledHeader>
                    <Text variant="h2">Playlists</Text>
                </StyledHeader>
                <Column style={{ "--gap": "24px" }}>
                    <SummaryCard title="Local Playlist" description={`${localPlaylist.length} themes`} to="/profile/playlist"/>
                    <Text variant="h2">Settings</Text>
                    <SearchFilterGroup>
                        <SearchFilter>
                            <Text>Color Theme</Text>
                            <Listbox value={colorTheme} onChange={setColorTheme}>
                                <Listbox.Option value={ColorTheme.SYSTEM}>System</Listbox.Option>
                                <Listbox.Option value={ColorTheme.DARK}>Dark</Listbox.Option>
                                <Listbox.Option value={ColorTheme.LIGHT}>Light</Listbox.Option>
                            </Listbox>
                        </SearchFilter>
                        <SearchFilter>
                            <Text>Show Announcements</Text>
                            <Listbox value={showAnnouncements} onChange={setShowAnnouncements}>
                                <Listbox.Option value={ShowAnnouncements.ENABLED}>Enabled</Listbox.Option>
                                <Listbox.Option value={ShowAnnouncements.DISABLED}>Disabled</Listbox.Option>
                            </Listbox>
                        </SearchFilter>
                        <SearchFilter>
                            <Text>Featured Theme Preview</Text>
                            <Listbox value={featuredThemePreview} onChange={setFeaturedThemePreview}>
                                <Listbox.Option value={FeaturedThemePreview.VIDEO}>Video</Listbox.Option>
                                <Listbox.Option value={FeaturedThemePreview.COVER}>Cover</Listbox.Option>
                                <Listbox.Option value={FeaturedThemePreview.DISABLED}>Disabled</Listbox.Option>
                            </Listbox>
                        </SearchFilter>
                    </SearchFilterGroup>
                    <SearchFilterGroup>
                        <SearchFilter>
                            <Text>Developer Mode</Text>
                            <Listbox value={developerMode} onChange={setDeveloperMode}>
                                <Listbox.Option value={DeveloperMode.DISABLED}>Disabled</Listbox.Option>
                                <Listbox.Option value={DeveloperMode.ENABLED}>Enabled</Listbox.Option>
                            </Listbox>
                        </SearchFilter>
                        {developerMode === DeveloperMode.ENABLED && (
                            <SearchFilter>
                                <Text>Revalidation Token</Text>
                                <Input
                                    value={revalidationToken ?? null}
                                    onChange={setRevalidationToken}
                                    icon={faKey}
                                />
                            </SearchFilter>
                        )}
                    </SearchFilterGroup>
                </Column>
                <StyledHeader>
                    <Text variant="h2">Recently Watched</Text>
                    <IconTextButton
                        icon={faTrash}
                        collapsible
                        onClick={clearHistory}
                    >Clear</IconTextButton>
                </StyledHeader>
                <Column style={{ "--gap": "16px" }}>
                    {[...history].reverse().map((theme) => (
                        <ThemeSummaryCard key={theme.id} theme={theme}/>
                    ))}
                </Column>
            </StyledProfileGrid>
        </>
    );
}
