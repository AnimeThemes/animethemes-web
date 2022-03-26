import { Head, Html, Main, NextScript } from "next/document";

const ThemeInjection = () => {
    // language=JavaScript
    const injectTheme = `
        (function() {
            let theme = window.localStorage.getItem("theme");
            if (!theme && window.matchMedia("(prefers-color-scheme: light)").matches) {
                theme = "light";
            }
            if (theme) {
                document.body.setAttribute("theme", theme);
            }
        })();
    `;

    return (
        <script
            dangerouslySetInnerHTML={{ __html: injectTheme }}
        />
    );
};

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* eslint-disable-next-line @next/next/google-font-display */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=fallback"
                    rel="stylesheet"
                />
            </Head>
            <body theme="dark">
                <ThemeInjection/>
                <Main/>
                <NextScript/>
            </body>
        </Html>
    );
}
