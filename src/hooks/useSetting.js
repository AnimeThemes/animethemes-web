import { useEffect, useState } from "react";

export default function useSetting({ __KEY__: key, __INITIAL_VALUE__: initialValue }) {
    const [setting, setSetting] = useState(initialValue);

    useEffect(() => {
        function reload() {
            const localSetting = window.localStorage.getItem(key);
            if (localSetting !== null) {
                setSetting(localSetting);
            }
        }

        reload();

        window.addEventListener("storage", reload);

        return () => window.removeEventListener("storage", reload);
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
