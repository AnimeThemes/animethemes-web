import { useDebounce } from "use-debounce";
import { SearchAnime, SearchArtist, SearchSeries, SearchStudio, SearchTheme } from "components/search";
import { Box } from "components/box";
import { useRouter } from "next/router";
import { SEO } from "components/seo";
import { capitalize } from "lodash-es";

export default function SearchEntityPage({ entity }) {
    const router = useRouter();
    const urlParams = router.query;
    const searchQuery = urlParams.q || "";

    const [ debouncedSearchQuery ] = useDebounce(searchQuery, 500);

    if (!router.isReady) {
        return null;
    }

    return (
        <Box gapsColumn="1.5rem">
            <SEO title={`${searchQuery ? `${searchQuery} - ` : ""}${capitalize(entity)} Index`}/>
            <Index searchEntity={entity} searchQuery={debouncedSearchQuery}/>
        </Box>
    );
}

function Index({ searchQuery, searchEntity }) {
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

export async function getStaticProps({ params: { entity } }) {
    return {
        props: {
            entity,
            isSearch: true
        }
    };
}

export async function getStaticPaths() {
    const entities = [ "anime", "theme", "artist", "series", "studio" ];

    return {
        paths: entities.map((entity) => ({
            params: { entity }
        })),
        fallback: false
    };
}
