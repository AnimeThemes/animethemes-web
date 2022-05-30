import Link from "next/link";
import { fetchData } from "lib/server";
import { SEO } from "components/seo";
import { Text } from "components/text";
import getSharedPageProps from "utils/getSharedPageProps";

export default function DocumentIndexPage({ pages }) {
    return (
        <>
            <SEO title="Wiki"/>
            <Text variant="h1">Wiki</Text>
            {pages.map((page) => (
                <Link key={page.slug} href={`/wiki/${page.slug}`} passHref prefetch={false}>
                    <Text as="a" link>{page.name}</Text>
                </Link>
            ))}
        </>
    );
}

export async function getStaticProps() {
    const { data, apiRequests } = await fetchData(`
        #graphql

        query {
            pageAll {
                slug
                name
            }
        }
    `);

    return {
        props: {
            ...getSharedPageProps(apiRequests),
            pages: data.pageAll
        },
        // Revalidate after 3 hours (= 10800 seconds).
        revalidate: 10800
    };
}
