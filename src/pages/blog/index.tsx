import { fetchData } from "lib/server";
import { SEO } from "components/seo";
import { Text } from "components/text";
import type { SharedPageProps } from "utils/getSharedPageProps";
import getSharedPageProps from "utils/getSharedPageProps";
import type { GetStaticProps } from "next";
import gql from "graphql-tag";
import type { DocumentIndexPageQuery } from "generated/graphql";
import { BackToTopButton, Button } from "components/button";
import { Card } from "components/card";
import Link from "next/link";
import { Column, Row } from "components/box";
import { groupBy } from "lodash-es";
import { Fragment } from "react";

interface DocumentIndexPageProps extends SharedPageProps, DocumentIndexPageQuery {}

export default function DocumentIndexPage({ pageAll }: DocumentIndexPageProps) {
    const pageGroups = Object.entries(
        groupBy(pageAll, (page) => new Date(page.created_at).getFullYear())
    ).sort((a, b) => parseInt(b[0]) - parseInt(a[0]));

    return <>
        <SEO title="Blog"/>
        <BackToTopButton/>
        <Text variant="h1">Blog</Text>
        <Text>On our blog we share the latest updates to the AnimeThemes site as well as other interesting news surrounding the project.</Text>
        {pageGroups.map(([year, pages], index) => (
            <Fragment key={year}>
                {index > 0 && <Text variant="h2">{year}</Text>}
                {pages.map((page) => (
                    <Link key={page.slug} href={`/${page.slug}`}>
                        <Card>
                            <Row style={{ "--justify-content": "space-between", "--align-items": "center", "--gap": "16px" }}>
                                <Column style={{ "--gap": "8px" }}>
                                    <Text color="text-primary" link>{page.name}</Text>
                                    <Text variant="small" color="text-muted">Posted on: {new Date(page.created_at).toLocaleDateString("en", { dateStyle: "long" })}</Text>
                                </Column>
                                <Button variant="silent">Read more</Button>
                            </Row>
                        </Card>
                    </Link>
                ))}
            </Fragment>
        ))}
    </>;
}

export const getStaticProps: GetStaticProps<DocumentIndexPageProps> = async () => {
    const { data, apiRequests } = await fetchData<DocumentIndexPageQuery>(gql`
        query DocumentIndexPage {
            pageAll {
                slug
                name
                created_at
            }
        }
    `);

    return {
        props: {
            ...getSharedPageProps(apiRequests),
            pageAll: data.pageAll
                .filter((page) => page.slug.startsWith("blog/") || page.slug.startsWith("status/"))
                .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
        },
        // Revalidate after 3 hours (= 10800 seconds).
        revalidate: 10800
    };
};
