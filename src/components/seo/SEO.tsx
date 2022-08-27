import type { PropsWithChildren } from "react";
import Head from "next/head";
import withBasePath from "utils/withBasePath";

interface SEOProps {
    title?: string
    description?: string
    image?: string
}

export function SEO({
    title,
    description = "AnimeThemes is a simple and consistent repository of anime opening and ending themes.",
    image = withBasePath("/img/logo.svg"),
    children
}: PropsWithChildren<SEOProps>) {
    const titleWithSuffix = title ? `${title} · AnimeThemes` : "AnimeThemes";

    return (
        <Head>
            <title key="title">{titleWithSuffix}</title>
            <meta key="description" name="description" content={description}/>
            <meta key="og:title" name="og:title" content={titleWithSuffix}/>
            <meta key="og:description" name="og:description" content={description}/>
            <meta key="og:image" name="og:image" content={image}/>
            <meta key="og:site_name" name="og:site_name" content="AnimeThemes"/>
            {children}
        </Head>
    );
}
