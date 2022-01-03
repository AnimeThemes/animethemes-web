import { Flex } from "components/box";
import { Icon } from "components/icon";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Text } from "components/text";
import { Menu } from "components/menu";
import { useLocalPlaylist } from "context/localPlaylistContext";

export function ThemeMenu({ theme }) {
    const { addToPlaylist, removeFromPlaylist, isInPlaylist } = useLocalPlaylist();

    const options = [
        !!theme.id && (isInPlaylist(theme) ? (
            <Flex as="button" gapsRow="0.5rem" alignItems="center" onClick={() => removeFromPlaylist(theme)}>
                <Icon icon={faMinus}/>
                <Text>Remove from Playlist</Text>
            </Flex>
        ) : (
            <Flex as="button" gapsRow="0.5rem" alignItems="center" onClick={() => addToPlaylist(theme)}>
                <Icon icon={faPlus}/>
                <Text>Add to Playlist</Text>
            </Flex>
        ))
    ].filter((option) => option);

    if (!options.length) {
        return null;
    }

    return (
        <Menu>
            {options}
        </Menu>
    );
}