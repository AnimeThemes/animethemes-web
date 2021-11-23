import Head from "next/head";
import withBasePath from "utils/withBasePath";

export function SEO({
    title,
    description = "AnimeThemes is a simple and consistent repository of anime opening and ending themes.",
    image = withBasePath("/img/logo.svg"),
    children
}) {
    const titleWithSuffix = title ? `${title} · AnimeThemes` : "AnimeThemes";

    return (
        <Head>
            <title>{titleWithSuffix}</title>
            <meta property="description" content={description}/>
            <meta property="og:title" content={titleWithSuffix}/>
            <meta property="og:description" content={description}/>
            <meta property="og:image" content={image}/>
            <meta property="og:site_name" content="AnimeThemes"/>
            {children}
        </Head>
    );
}
