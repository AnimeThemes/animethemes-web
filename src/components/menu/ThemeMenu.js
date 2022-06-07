import { Icon } from "components/icon";
import { faMinus, faPlus } from "@fortawesome/pro-solid-svg-icons";
import { Text } from "components/text";
import { Menu } from "components/menu";
import useLocalPlaylist from "hooks/useLocalPlaylist";
import gql from "graphql-tag";

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

ThemeMenu.fragment = gql`    
    fragment ThemeMenu_theme on Theme {
        id
        # Hidden inside local playlist context
        song {
            title
        }
    }
`;
