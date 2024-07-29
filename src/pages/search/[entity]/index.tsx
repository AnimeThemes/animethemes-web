import { useEffect, useState } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { capitalize } from "lodash-es";
import type { ParsedUrlQuery } from "querystring";

import { SearchAnime } from "@/components/search/SearchAnime";
import { SearchArtist } from "@/components/search/SearchArtist";
import { SearchPlaylist } from "@/components/search/SearchPlaylist";
import { SearchSeries } from "@/components/search/SearchSeries";
import { SearchStudio } from "@/components/search/SearchStudio";
import { SearchTheme } from "@/components/search/SearchTheme";
import { SEO } from "@/components/seo/SEO";

const SEARCH_ENTITIES = ["anime", "theme", "artist", "series", "studio", "playlist"] as const;

interface SearchEntityPageProps {
    entity: (typeof SEARCH_ENTITIES)[number];
}

interface SearchEntityPageParams extends ParsedUrlQuery {
    entity: (typeof SEARCH_ENTITIES)[number];
}

export default function SearchEntityPage({ entity }: SearchEntityPageProps) {
    const router = useRouter();
    const urlParams = router.query;
    const searchQuery = Array.isArray(urlParams.q) ? urlParams.q.join() : urlParams.q;

    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (router.isReady) {
            setShouldRender(true);
        }
    }, [router.isReady]);

    if (!shouldRender) {
        return <SEO title={`${capitalize(entity)} Index`} />;
    }

    return (
        <>
            <SEO title={`${searchQuery ? `${searchQuery} - ` : ""}${capitalize(entity)} Index`} />
            <Index searchEntity={entity} searchQuery={searchQuery} />
        </>
    );
}

interface IndexProps {
    searchQuery?: string;
    searchEntity: (typeof SEARCH_ENTITIES)[number];
}

function Index({ searchQuery, searchEntity }: IndexProps) {
    switch (searchEntity) {
        case "anime":
            return <SearchAnime searchQuery={searchQuery} />;
        case "theme":
            return <SearchTheme searchQuery={searchQuery} />;
        case "artist":
            return <SearchArtist searchQuery={searchQuery} />;
        case "series":
            return <SearchSeries searchQuery={searchQuery} />;
        case "studio":
            return <SearchStudio searchQuery={searchQuery} />;
        case "playlist":
            return <SearchPlaylist searchQuery={searchQuery} />;
        default:
            // Should never happen
            return null;
    }
}

export const getStaticProps: GetStaticProps<SearchEntityPageProps, SearchEntityPageParams> = ({ params }) => {
    if (!params || !SEARCH_ENTITIES.includes(params.entity)) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            entity: params.entity,
            isSearch: true,
        },
    };
};

export const getStaticPaths: GetStaticPaths<SearchEntityPageParams> = () => {
    return {
        paths: SEARCH_ENTITIES.map((entity) => ({
            params: { entity },
        })),
        fallback: false,
    };
};
