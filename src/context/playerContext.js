import React from "react";

const PlayerContext = React.createContext({
    currentVideo: null,
    setCurrentVideo: () => {}
});

export default PlayerContext;
