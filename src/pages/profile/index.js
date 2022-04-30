import styled from "styled-components";
import { SEO } from "components/seo";
import { Column } from "components/box";
import { Text } from "components/text";
import { SummaryCard, ThemeSummaryCard } from "components/card";
import { IconTextButton } from "components/button";
import { faKey, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useWatchHistory } from "context/watchHistoryContext";
import { useLocalPlaylist } from "context/localPlaylistContext";
import theme from "theme";
import { SearchFilter, SearchFilterGroup } from "components/search-filter";
import { Listbox } from "components/listbox";
import {
    devModeSetting,
    featuredThemePreviewSetting,
    revalidationTokenSetting,
    showAnnouncementsSetting
} from "utils/settings";
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

    const [showAnnouncementsSettingValue, setShowAnnouncementsSettingValue] = useSetting(showAnnouncementsSetting);
    const [featuredThemePreviewSettingValue, setFeaturedThemePreviewSettingValue] = useSetting(featuredThemePreviewSetting);
    const [devModeSettingValue, setDevModeSettingValue] = useSetting(devModeSetting);
    const [revalidationTokenSettingValue, setRevalidationTokenSettingValue] = useSetting(revalidationTokenSetting);

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
                            <Text>Show Announcements</Text>
                            <Listbox value={showAnnouncementsSettingValue} onChange={setShowAnnouncementsSettingValue}>
                                {Object.entries(showAnnouncementsSetting.values).map(([ value, label ]) => (
                                    <Listbox.Option key={value} value={value}>{label}</Listbox.Option>
                                ))}
                            </Listbox>
                        </SearchFilter>
                        <SearchFilter>
                            <Text>Featured Theme Preview</Text>
                            <Listbox value={featuredThemePreviewSettingValue} onChange={setFeaturedThemePreviewSettingValue}>
                                {Object.entries(featuredThemePreviewSetting.values).map(([ value, label ]) => (
                                    <Listbox.Option key={value} value={value}>{label}</Listbox.Option>
                                ))}
                            </Listbox>
                        </SearchFilter>
                        <SearchFilter>
                            <Text>Developer Mode</Text>
                            <Listbox value={devModeSettingValue} onChange={setDevModeSettingValue}>
                                {Object.entries(devModeSetting.values).map(([ value, label ]) => (
                                    <Listbox.Option key={value} value={value}>{label}</Listbox.Option>
                                ))}
                            </Listbox>
                        </SearchFilter>
                        {devModeSettingValue === "enabled" && (
                            <SearchFilter>
                                <Text>Revalidation Token</Text>
                                <Input
                                    value={revalidationTokenSettingValue}
                                    onChange={setRevalidationTokenSettingValue}
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
