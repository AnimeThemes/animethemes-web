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
        blogPages(
            sort: CREATED_AT_DESC
        ) {
            nodes {
                slug
                name
                createdAt
            }
        }
    }
`);

interface DocumentIndexPageProps extends SharedPageProps, ResultOf<typeof propsQuery> {}

export default function DocumentIndexPage({ blogPages }: DocumentIndexPageProps) {
    const pageGroups = Object.entries(
        groupBy(blogPages.nodes, (page) => new Date(page.createdAt).getFullYear()),
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

    return {
        props: {
            ...getSharedPageProps(),
            ...data,
        },
        // Revalidate after 3 hours (= 10800 seconds).
        revalidate: 10800,
    };
};
