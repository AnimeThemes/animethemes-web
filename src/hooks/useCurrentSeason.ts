import { useEffect, useState } from "react";

interface CurrentSeason {
    currentYear: number
    currentSeason: "winter" | "spring" | "summer" | "fall"
}

export default function useCurrentSeason(): CurrentSeason {
    // Server-side
    const [ current, setCurrent ] = useState(() => ({
        year: getCurrentYear(),
        season: getCurrentSeason()
    }));

    useEffect(() => {
        // Client-side (hydration)
        setCurrent({
            year: getCurrentYear(),
            season: getCurrentSeason()
        });
    }, []);

    return {
        currentYear: current.year,
        currentSeason: current.season
    };
}

function getCurrentYear(): CurrentSeason["currentYear"] {
    return new Date().getFullYear();
}

function getCurrentSeason(): CurrentSeason["currentSeason"] {
    const month = new Date().getMonth();
    switch (month) {
        case 0:
        case 1:
        case 2:
            return "winter";
        case 3:
        case 4:
        case 5:
            return "spring";
        case 6:
        case 7:
        case 8:
            return "summer";
        case 9:
        case 10:
        case 11:
            return "fall";
        default:
            throw new Error("Unknown month.");
    }
}
