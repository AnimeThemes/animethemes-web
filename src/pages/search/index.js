import { useDebounce } from "use-debounce";
import { SearchGlobal } from "components/search";
import { Column, Row } from "components/box";
import { faCompass, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Text } from "components/text";
import { Icon } from "components/icon";
import { useRouter } from "next/router";
import { SEO } from "components/seo";

export default function SearchGlobalPage() {
    const router = useRouter();
    const urlParams = router.query;
    const searchQuery = urlParams.q || "";

    const [ debouncedSearchQuery ] = useDebounce(searchQuery, 500);

    if (!router.isReady) {
        return null;
    }

    return (
        <>
            <SEO title={searchQuery ? `${searchQuery} - Search` : "Search"}/>
            {debouncedSearchQuery ? (
                <SearchGlobal searchQuery={debouncedSearchQuery}/>
            ) : (
                <Column style={{ "--gap": "16px" }}>
                    <Row style={{ "--gap": "16px" }}>
                        <Icon icon={faSearch} color="text-primary"/>
                        <Text color="text-muted">Looking for something specific? Use the search bar on the left!</Text>
                    </Row>
                    <Row style={{ "--gap": "16px" }}>
                        <Icon icon={faCompass} color="text-primary"/>
                        <Text color="text-muted">Feeling adventurous? Explore the database by choosing a category on the right!</Text>
                    </Row>
                </Column>
            )}
        </>
    );
}

export async function getStaticProps() {
    return {
        props: {
            isSearch: true
        }
    };
}
