import { useEffect, useState } from "react";

export default function useHistory() {
    const [ history, setHistory ] = useState([]);

    useEffect(() => {
        reload();

        window.addEventListener("storage", reload);

        return () => window.removeEventListener("storage", reload);
    }, []);

    function reload() {
        setHistory(load());
    }

    function addToHistory(theme) {
        const history = load();

        // Don't add if the most recent entry is the same as the new one
        if (history.at(-1)?.id === theme.id) {
            return;
        }

        history.push(theme);

        // Keep history below 100 entries
        if (history.length > 100) {
            history.shift();
        }

        save(history);
        reload();
    }

    function clearHistory() {
        save([]);
        reload();
    }

    return {
        history,
        addToHistory,
        clearHistory
    };
}

function load() {
    const raw = window.localStorage.getItem("history");

    if (raw) {
        return JSON.parse(raw);
    }

    return [];
}

function save(history) {
    window.localStorage.setItem("history", JSON.stringify(history));
}
