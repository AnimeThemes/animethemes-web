import { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

export default function useColorTheme() {
    const [ theme, setTheme ] = useLocalStorageState("theme", { ssr: true }, "system");

    useEffect(() => {
        setTheme(document.body.getAttribute("theme"));
    }, [setTheme]);

    useEffect(() => {
        document.body.setAttribute("theme", theme);
    }, [theme]);

    return [theme, setTheme];
}
