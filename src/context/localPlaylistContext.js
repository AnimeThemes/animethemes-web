import { createContext, useCallback, useContext, useEffect, useState } from "react";

const LocalPlaylistContext = createContext();

export function LocalPlaylistProvider({ children }) {
    const [ localPlaylist, setLocalPlaylist ] = useState([]);

    const reload = useCallback(() => setLocalPlaylist(load()), [ setLocalPlaylist ]);

    const addToPlaylist = useCallback((theme) => {
        const localPlaylist = load();

        localPlaylist.push(theme);

        save(localPlaylist);
        reload();
    }, [ reload ]);

    const removeFromPlaylist = useCallback((theme) => {
        const localPlaylist = load();

        const index = localPlaylist.findIndex((t) => t.id === theme.id);
        if (index !== -1) {
            localPlaylist.splice(index, 1);
        }

        save(localPlaylist);
        reload();
    }, [ reload ]);

    const isInPlaylist = useCallback((theme) => !!localPlaylist.find((t) => t.id === theme.id), [ localPlaylist ]);

    const setPlaylist = useCallback((playlist) => {
        save(playlist);
        reload();
    }, [ reload ]);

    useEffect(() => {
        reload();

        window.addEventListener("storage", reload);

        return () => window.removeEventListener("storage", reload);
    }, [ reload ]);

    const value = {
        localPlaylist,
        addToPlaylist,
        removeFromPlaylist,
        isInPlaylist,
        setPlaylist
    };

    return (
        <LocalPlaylistContext.Provider value={value}>
            {children}
        </LocalPlaylistContext.Provider>
    );
}

export function useLocalPlaylist() {
    return useContext(LocalPlaylistContext);
}

function load() {
    const raw = window.localStorage.getItem("local-playlist");

    if (raw) {
        return JSON.parse(raw);
    }

    return [];
}

function save(localPlaylist) {
    window.localStorage.setItem("local-playlist", JSON.stringify(localPlaylist));
}
