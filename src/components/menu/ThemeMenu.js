import { Icon } from "components/icon";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Text } from "components/text";
import { Menu } from "components/menu";
import { useLocalPlaylist } from "context/localPlaylistContext";

export function ThemeMenu({ theme }) {
    const { addToPlaylist, removeFromPlaylist, isInPlaylist } = useLocalPlaylist();

    const options = [
        !!theme.id && (isInPlaylist(theme) ? (
            <Menu.Option key="add" onSelect={() => removeFromPlaylist(theme)}>
                <Icon icon={faMinus}/>
                <Text>Remove from Playlist</Text>
            </Menu.Option>
        ) : (
            <Menu.Option key="remove" onSelect={() => addToPlaylist(theme)}>
                <Icon icon={faPlus}/>
                <Text>Add to Playlist</Text>
            </Menu.Option>
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