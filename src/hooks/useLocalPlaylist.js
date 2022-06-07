import useLocalStorageState from "use-local-storage-state";
import { ThemeSummaryCard } from "components/card";
import { PlaylistAddToast } from "components/toast";
import { useToasts } from "context/toastContext";

export default function useLocalPlaylist() {
    const [ localPlaylist, setLocalPlaylist ] = useLocalStorageState("local-playlist", { ssr: true, defaultValue: [] });
    const { dispatchToast } = useToasts();

    function addToPlaylist(theme) {
        ThemeSummaryCard.fetchData(theme.id).then((themeFiltered) => {
            setLocalPlaylist([ ...localPlaylist, themeFiltered ]);

            dispatchToast(theme.id, <PlaylistAddToast theme={theme}/>);
        });
    }

    function removeFromPlaylist(theme) {
        setLocalPlaylist(localPlaylist.filter((t) => t.id !== theme.id));
    }

    function isInPlaylist(theme) {
        return !!localPlaylist.find((t) => t.id === theme.id);
    }

    function setPlaylist(playlist) {
        setLocalPlaylist(playlist);
    }

    return {
        localPlaylist,
        addToPlaylist,
        removeFromPlaylist,
        isInPlaylist,
        setPlaylist,
    };
}
