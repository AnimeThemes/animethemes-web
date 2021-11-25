import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

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

export default class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
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

    render() {
        return (
            <Html lang="en">
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Nunito&display=optional"
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

}
