import { useEffect, useState } from "react";

export default function useSetting({ key, initialValue }) {
    const [setting, setSetting] = useState(initialValue);

    useEffect(() => {
        const localSetting = window.localStorage.getItem(key);
        if (localSetting !== null) {
            setSetting(localSetting);
        }
    }, [ key ]);

    function updateSetting(value) {
        setSetting(value);

        window.localStorage.setItem(key, value);
    }

    return [
        setting,
        updateSetting
    ];
}
