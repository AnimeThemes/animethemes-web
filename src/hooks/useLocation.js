import { useEffect, useState } from "react";

export default function useLocation() {
    const [ location, setLocation ] = useState({});

    useEffect(() => setLocation(window.location), []);

    return location;
}
