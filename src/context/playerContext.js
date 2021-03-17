import { createContext } from "react";

const PlayerContext = createContext({
    currentVideo: null,
    setCurrentVideo: () => {}
});

export default PlayerContext;
