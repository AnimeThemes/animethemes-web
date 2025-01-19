import { useRouter } from "next/router";

import { faCompass, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { Column, Row } from "@/components/box/Flex";
import { Icon } from "@/components/icon/Icon";
import { SearchGlobal } from "@/components/search/SearchGlobal";
import { SEO } from "@/components/seo/SEO";
import { Text } from "@/components/text/Text";

export default function SearchGlobalPage() {
    const router = useRouter();
    const urlParams = router.query;
    const searchQuery = Array.isArray(urlParams.q) ? urlParams.q.join() : urlParams.q;

    return (
        <>
            <SEO title={searchQuery ? `${searchQuery} - Search` : "Search"} />
            {searchQuery ? (
                <SearchGlobal searchQuery={searchQuery} />
            ) : (
                <Column style={{ "--gap": "16px" }}>
                    <Row style={{ "--gap": "16px" }}>
                        <Icon icon={faMagnifyingGlass} color="text-primary" />
                        <Text color="text-muted">Looking for something specific? Use the search bar on the left!</Text>
                    </Row>
                    <Row style={{ "--gap": "16px" }}>
                        <Icon icon={faCompass} color="text-primary" />
                        <Text color="text-muted">
                            Feeling adventurous? Explore the database by choosing a category on the right!
                        </Text>
                    </Row>
                </Column>
            )}
        </>
    );
}

export async function getStaticProps() {
    return {
        props: {
            isSearch: true,
        },
    };
}
