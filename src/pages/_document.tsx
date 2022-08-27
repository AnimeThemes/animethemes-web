import type { DocumentContext } from "next/document";
import Document, { Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

const ThemeInjection = () => {
    // language=JavaScript
    const injectTheme = `
        (function() {
            let theme = JSON.parse(window.localStorage.getItem("theme"));
            if (!theme && window.matchMedia("(prefers-color-scheme: light)").matches) {
                theme = "light";
            }
            if (theme) {
                document.body.dataset.theme = theme;
            }
        })();
    `;

    return (
        <script
            dangerouslySetInnerHTML={{ __html: injectTheme }}
        />
    );
};

export default class MyDocument extends Document {

    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* eslint-disable-next-line @next/next/google-font-display */}
                    <link
                        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=fallback"
                        rel="stylesheet"
                    />
                </Head>
                <body data-theme="system">
                    <ThemeInjection/>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        );
    }

    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () => originalRenderPage({
                enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
            });

            const initialProps = await Document.getInitialProps(ctx);

            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

}
