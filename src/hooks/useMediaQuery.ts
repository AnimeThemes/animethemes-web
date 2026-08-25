import { useEffect, useState } from "react";

export default function useMediaQuery(query: string, initialIsMatching = false) {
    const [isMatching, setIsMatching] = useState(initialIsMatching);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMatching(mediaQuery.matches);

        const onChange = (event: MediaQueryListEvent) => setIsMatching(event.matches);

        mediaQuery.addEventListener("change", onChange);

        return () => mediaQuery.removeEventListener("change", onChange);
    }, [query]);

    return isMatching;
}
