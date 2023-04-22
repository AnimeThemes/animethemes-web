import { useEffect, useState } from "react";

export default function useMouseRelax() {
    const [isRelaxed, setRelaxed] = useState(false);

    useEffect(() => {
        let timeoutId: number;

        function onMouseMove() {
            setRelaxed(false);

            clearTimeout(timeoutId);

            timeoutId = window.setTimeout(() => setRelaxed(true), 2500);
        }

        addEventListener("pointermove", onMouseMove);
        addEventListener("pointerdown", onMouseMove);

        return () => {
            removeEventListener("pointermove", onMouseMove);
            removeEventListener("pointerdown", onMouseMove);
            clearTimeout(timeoutId);
        };
    }, []);

    return isRelaxed;
}
