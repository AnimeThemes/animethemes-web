import { SEO } from "components/seo";
import { Box, Flex, Grid } from "components/box";
import { Text } from "components/text";
import { SummaryCard, ThemeSummaryCard } from "components/card";
import useLocalPlaylist from "hooks/useLocalPlaylist";
import useHistory from "hooks/useHistory";
import { Button } from "components/button";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "components/icon";
import { useMedia } from "use-media";

export default function ProfilePage() {
    const { localPlaylist } = useLocalPlaylist();
    const { history, clearHistory } = useHistory();
    const isMobile = useMedia({ maxWidth: "720px" });

    return (
        <Box gapsColumn="1.5rem">
            <SEO title="My Profile"/>
            <Text variant="h1">My Profile</Text>
            <Grid
                gridTemplateColumns={[ "1fr", "1fr 1fr" ]}
                gridTemplateRows={[ "repeat(4, auto)", "repeat(2, auto)" ]}
                gridAutoFlow="column"
                gridGap="1rem 2rem"
            >
                <Box alignSelf="center">
                    <Text variant="h2">Playlists</Text>
                </Box>
                <Flex flexDirection="column" gap="1rem">
                    <SummaryCard title="Local Playlist" description={`${localPlaylist.length} themes`} to="/profile/playlist"/>
                </Flex>
                <Flex justifyContent="space-between" alignItems="center">
                    <Text variant="h2">Recently Watched</Text>
                    <Button silent circle={isMobile} gapsRow="0.5rem" onClick={clearHistory}>
                        <Icon icon={faTrash} color="text-disabled"/>
                        <Text display={[ "none", "inline" ]}>Clear</Text>
                    </Button>
                </Flex>
                <Flex flexDirection="column" gap="1rem">
                    {[...history].reverse().map((theme) => (
                        <ThemeSummaryCard key={theme.id} theme={theme}/>
                    ))}
                </Flex>
            </Grid>
        </Box>
    );
}
