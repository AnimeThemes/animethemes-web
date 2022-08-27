import { SearchAnime, SearchArtist, SearchSeries, SearchStudio, SearchTheme } from "components/search";
import { useRouter } from "next/router";
import { SEO } from "components/seo";
import { capitalize } from "lodash-es";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";

const SEARCH_ENTITIES = [ "anime", "theme", "artist", "series", "studio" ] as const;

interface SearchEntityPageProps {
    entity: typeof SEARCH_ENTITIES[number]
}

interface SearchEntityPageParams extends ParsedUrlQuery {
    entity: typeof SEARCH_ENTITIES[number]
}

export default function SearchEntityPage({ entity }: SearchEntityPageProps) {
    const router = useRouter();
    const urlParams = router.query;
    const searchQuery = Array.isArray(urlParams.q) ? urlParams.q.join() : urlParams.q;

    return (
        <>
            <SEO title={`${searchQuery ? `${searchQuery} - ` : ""}${capitalize(entity)} Index`}/>
            {router.isReady ? (
                <Index searchEntity={entity} searchQuery={searchQuery}/>
            ) : null}
        </>
    );
}

interface IndexProps {
    searchQuery?: string
    searchEntity: typeof SEARCH_ENTITIES[number]
}

function Index({ searchQuery, searchEntity }: IndexProps) {
    switch (searchEntity) {
        case "anime":
            return <SearchAnime searchQuery={searchQuery}/>;
        case "theme":
            return <SearchTheme searchQuery={searchQuery}/>;
        case "artist":
            return <SearchArtist searchQuery={searchQuery}/>;
        case "series":
            return <SearchSeries searchQuery={searchQuery}/>;
        case "studio":
            return <SearchStudio searchQuery={searchQuery}/>;
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
            isSearch: true
        }
    };
};

export const getStaticPaths: GetStaticPaths<SearchEntityPageParams> = () => {
    return {
        paths: SEARCH_ENTITIES.map((entity) => ({
            params: { entity }
        })),
        fallback: false
    };
};
