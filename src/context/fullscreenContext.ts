import { createContext } from "react";

interface FullscreenContextValue {
    isFullscreen: boolean;
    toggleFullscreen(): void;
}

const FullscreenContext = createContext<FullscreenContextValue>({
    isFullscreen: false,
    toggleFullscreen() {
        // Do nothing.
    }
});

export default FullscreenContext;
