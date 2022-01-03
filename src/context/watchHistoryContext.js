import { createContext, useCallback, useContext, useEffect, useState } from "react";

const WatchHistoryContext = createContext();

export function WatchHistoryProvider({ children }) {
    const [ history, setHistory ] = useState([]);

    const reload = useCallback(() => setHistory(load()), [ setHistory ]);

    const addToHistory = useCallback((theme) => {
        let history = load();

        // Don't add if the most recent entry is the same as the new one
        if (history[history.length - 1]?.id === theme.id) {
            return;
        }

        // Remove all previous occurences of the theme to avoid duplicates
        history = history.filter((t) => t.id !== theme.id);

        history.push(theme);

        // Keep history below 100 entries
        if (history.length > 100) {
            history.shift();
        }

        save(history);
        reload();
    }, [ reload ]);

    const clearHistory = useCallback(() => {
        save([]);
        reload();
    }, [ reload ]);

    useEffect(() => {
        reload();

        window.addEventListener("storage", reload);

        return () => window.removeEventListener("storage", reload);
    }, [ reload ]);

    const value = {
        history,
        addToHistory,
        clearHistory
    };

    return (
        <WatchHistoryContext.Provider value={value}>
            {children}
        </WatchHistoryContext.Provider>
    );
}

export function useWatchHistory() {
    return useContext(WatchHistoryContext);
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
