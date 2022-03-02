import { createContext } from "react";

const PlayerContext = createContext({
    currentVideo: null,
    clearCurrentVideo: () => {}
});

export default PlayerContext;
