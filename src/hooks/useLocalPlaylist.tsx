import useLocalStorageState from "use-local-storage-state";
import { PlaylistAddToast } from "components/toast";
import { useToasts } from "context/toastContext";
import type { FetchThemeSummaryCardData } from "components/card/ThemeSummaryCard";
import { fetchThemeSummaryCardData } from "components/card/ThemeSummaryCard";

interface LocalPlaylistTheme {
    id: number
}

type LocalPlaylist = Array<NonNullable<FetchThemeSummaryCardData> & LocalPlaylistTheme>;

export default function useLocalPlaylist() {
    const [ localPlaylist, setLocalPlaylist ] = useLocalStorageState<LocalPlaylist>("local-playlist", { ssr: true, defaultValue: [] });
    const { dispatchToast } = useToasts();

    function addToPlaylist(theme: LocalPlaylistTheme) {
        fetchThemeSummaryCardData(theme.id).then((themeFresh) => {
            if (themeFresh) {
                setLocalPlaylist([
                    ...localPlaylist,
                    {
                        ...theme,
                        ...themeFresh,
                    }
                ]);

                dispatchToast(String(theme.id), <PlaylistAddToast theme={themeFresh}/>);
            }
        });
    }

    function removeFromPlaylist(theme: LocalPlaylistTheme) {
        setLocalPlaylist(localPlaylist.filter((t) => t.id !== theme.id));
    }

    function isInPlaylist(theme: LocalPlaylistTheme) {
        return !!localPlaylist.find((t) => t.id === theme.id);
    }

    function setPlaylist(playlist: LocalPlaylist) {
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
