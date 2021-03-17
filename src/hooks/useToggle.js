import { useState } from "react";

export default function useToggle(initialValue = false, toggleValue = true) {
    const [isToggled, setToggled] = useState(false);

    function toggle() {
        setToggled((val) => !val);
    }

    return [isToggled ? toggleValue : initialValue, toggle];
}
