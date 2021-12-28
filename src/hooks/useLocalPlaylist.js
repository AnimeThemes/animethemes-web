import { useEffect, useState } from "react";

export default function useLocalPlaylist() {
    const [ localPlaylist, setLocalPlaylist ] = useState([]);

    useEffect(() => {
        reload();

        window.addEventListener("storage", reload);

        return () => window.removeEventListener("storage", reload);
    }, []);

    function reload() {
        setLocalPlaylist(load());
    }

    function addToPlaylist(theme) {
        const localPlaylist = load();

        localPlaylist.push(theme);

        save(localPlaylist);
        reload();
    }

    function removeFromPlaylist(theme) {
        const localPlaylist = load();

        const index = localPlaylist.findIndex((t) => t.id === theme.id);
        if (index !== -1) {
            localPlaylist.splice(index, 1);
        }

        save(localPlaylist);
        reload();
    }

    function isInPlaylist(theme) {
        return !!localPlaylist.find((t) => t.id === theme.id);
    }

    function setPlaylist(playlist) {
        save(playlist);
        reload();
    }

    return {
        localPlaylist,
        addToPlaylist,
        removeFromPlaylist,
        isInPlaylist,
        setPlaylist
    };
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
