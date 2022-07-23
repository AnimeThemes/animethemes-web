import { createContext } from "react";

interface PlayerContextInterface {
    currentVideo: {
        filename: string
    } | null
    clearCurrentVideo: () => void
}

const PlayerContext = createContext<PlayerContextInterface>({
    currentVideo: null,
    clearCurrentVideo: () => {
        // Do nothing
    }
});

export default PlayerContext;
