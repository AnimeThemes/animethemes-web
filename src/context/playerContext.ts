import { createContext } from "react";

interface PlayerContextInterface {
    currentVideo: {
        filename: string
    } | null
    clearCurrentVideo: () => void
    watchList: any[];
    setWatchList: (watchList: any[]) => void;
}

const PlayerContext = createContext<PlayerContextInterface>({
    currentVideo: null,
    clearCurrentVideo: () => {
        // Do nothing
    },
    watchList: [],
    setWatchList: () => {
        // Do nothing
    }
});

export default PlayerContext;
