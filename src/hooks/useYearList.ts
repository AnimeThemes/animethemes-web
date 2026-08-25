import { useEffect, useState } from "react";

import { rangeRight } from "lodash-es";

export default function useYearList() {
    // Server-side
    const [yearList, setYearList] = useState(() => getYearList());

    useEffect(() => {
        // Client-side (hydration)
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setYearList(getYearList());
    }, []);

    return yearList;
}

function getYearList() {
    return rangeRight(1963, new Date().getFullYear() + 1);
}
