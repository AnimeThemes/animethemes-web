import Link from "next/link";
import { fetchData } from "lib/server";
import { SEO } from "components/seo";
import { Text } from "components/text";

export default function DocumentIndexPage({ pages }) {
    return (
        <>
            <SEO title="Pages"/>
            <Text variant="h1">Pages</Text>
            {pages.map((page) => (
                <Link key={page.slug} href={`/page/${page.slug}`} passHref>
                    <Text as="a" link>{page.name}</Text>
                </Link>
            ))}
        </>
    );
}

export async function getStaticProps() {
    const { data } = await fetchData(`
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
            pages: data.pageAll
        },
        revalidate: 5 * 60
    };
}
