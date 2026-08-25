import { useEffect, useEffectEvent, useRef, useState } from "react";

// This hook returns an object of props, which should be assigned to an element.
export default function useMouseRelax() {
    const [isRelaxed, setRelaxed] = useState(false);

    const timeoutId = useRef<number>(undefined);

    // Whenever the user moves or presses their pointer inside the element,
    // start a timer and cancel any previous timers. If the timer finishes without
    // getting cancelled it means the pointer hasn't moved for n seconds, meaning it's relaxed.
    function onPointerUpdate() {
        setRelaxed(false);

        clearTimeout(timeoutId.current);

        timeoutId.current = window.setTimeout(() => setRelaxed(true), 3000);
    }

    // When the user moves their pointer outside the element, we set it as relaxed immediately.
    function onMouseLeave() {
        setRelaxed(true);
    }

    const onPointerUpdateEvent = useEffectEvent(onPointerUpdate);

    // We want to run the logic above once when the component mounts.
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        onPointerUpdateEvent();
    }, []);

    return {
        onPointerMove: onPointerUpdate,
        onPointerDown: onPointerUpdate,
        onMouseLeave,
        "data-relaxed": isRelaxed || undefined,
    };
}
