import { useEffect, useState } from "react";
import { fetchCurrentSeason } from "lib/client/currentSeason";

let cache = null;

export default function useCurrentSeason() {
    const [ current, setCurrent ] = useState(null);

    useEffect(() => {
        if (!cache) {
            fetchCurrentSeason()
                .then((current) => {
                    cache = current;

                    setCurrent(current);
                });
        } else {
            setCurrent(cache);
        }
    }, []);

    return {
        currentYear: current?.year,
        currentSeason: current?.season.toLowerCase()
    };
}
