import { Fragment } from "react";
import type { GetStaticProps } from "next";
import Link from "next/link";

import type { ResultOf } from "@graphql-typed-document-node/core";
import { groupBy } from "lodash-es";

import { Column, Row } from "@/components/box/Flex";
import { BackToTopButton } from "@/components/button/BackToTopButton";
import { Button } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { SEO } from "@/components/seo/SEO";
import { Text } from "@/components/text/Text";
import createApolloClient from "@/graphql/createApolloClient";
import { graphql } from "@/graphql/generated";
import type { SharedPageProps } from "@/utils/getSharedPageProps";
import getSharedPageProps from "@/utils/getSharedPageProps";

const propsQuery = graphql(`
    query DocumentIndexPage {
        pagePagination(
            #            where: {
            #                OR: [
            #                    { column: SLUG, operator: LIKE, value: "blog/%" }
            #                    { column: SLUG, operator: LIKE, value: "status/%" }
            #                ]
            #            }
            sort: CREATED_AT_DESC
        ) {
            data {
                slug
                name
                createdAt
            }
        }
    }
`);

interface DocumentIndexPageProps extends SharedPageProps, ResultOf<typeof propsQuery> {}

export default function DocumentIndexPage({ pagePagination }: DocumentIndexPageProps) {
    const pageGroups = Object.entries(
        groupBy(pagePagination.data, (page) => (page.createdAt ? new Date(page.createdAt).getFullYear() : "Unknown")),
    ).sort((a, b) => parseInt(b[0]) - parseInt(a[0]));

    return (
        <>
            <SEO title="Blog" />
            <BackToTopButton />
            <Text variant="h1">Blog</Text>
            <Text>
                On our blog we share the latest updates to the AnimeThemes site as well as other interesting news
                surrounding the project.
            </Text>
            {pageGroups.map(([year, pages], index) => (
                <Fragment key={year}>
                    {index > 0 && <Text variant="h2">{year}</Text>}
                    {pages.map((page) => (
                        <Link key={page.slug} href={`/${page.slug}`}>
                            <Card>
                                <Row
                                    style={{
                                        "--justify-content": "space-between",
                                        "--align-items": "center",
                                        "--gap": "16px",
                                    }}
                                >
                                    <Column style={{ "--gap": "8px" }}>
                                        <Text color="text-primary" link>
                                            {page.name}
                                        </Text>
                                        {page.createdAt !== null && (
                                            <Text variant="small" color="text-muted">
                                                Posted on:{" "}
                                                {new Date(page.createdAt).toLocaleDateString("en", {
                                                    dateStyle: "long",
                                                })}
                                            </Text>
                                        )}
                                    </Column>
                                    <Button variant="silent">Read more</Button>
                                </Row>
                            </Card>
                        </Link>
                    ))}
                </Fragment>
            ))}
        </>
    );
}

export const getStaticProps: GetStaticProps<DocumentIndexPageProps> = async () => {
    const client = createApolloClient();

    const { data } = await client.query({
        query: propsQuery,
    });

    // We have to do the filtering manually because the `where` clause doesn't support LIKE.
    // See the commented part of the query above.
    const transformedData = {
        ...data,
        pagePagination: {
            ...data.pagePagination,
            data: data.pagePagination.data.filter(
                (page) => page.slug.startsWith("blog/") || page.slug.startsWith("status/"),
            ),
        },
    };

    return {
        props: {
            ...getSharedPageProps(),
            ...transformedData,
        },
        // Revalidate after 3 hours (= 10800 seconds).
        revalidate: 10800,
    };
};
