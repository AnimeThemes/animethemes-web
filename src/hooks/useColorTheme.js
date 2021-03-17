import { useEffect, useState } from "react";

export default function useColorTheme() {
    const [ theme, setTheme ] = useState(null);

    useEffect(() => {
        const body = document.body;

        setTheme(body.getAttribute("theme"));
    }, []);

    function toggleTheme() {
        const newTheme = theme === "dark" ? "light" : "dark";

        setTheme(newTheme);

        const body = document.body;
        body.setAttribute("theme", newTheme);

        window.localStorage.setItem("theme", newTheme);
    }

    return [theme, toggleTheme];
}
