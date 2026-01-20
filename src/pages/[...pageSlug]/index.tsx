import styled from "styled-components";
import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import type { ResultOf } from "@graphql-typed-document-node/core";
import type { ParsedUrlQuery } from "querystring";

import { Icon } from "@/components/icon/Icon";
import { Markdown } from "@/components/markdown/Markdown";
import { TableOfContents } from "@/components/markdown/TableOfContents";
import { SEO } from "@/components/seo/SEO";
import { Text } from "@/components/text/Text";
import createApolloClient from "@/graphql/createApolloClient";
import { graphql } from "@/graphql/generated";
import theme from "@/theme";
import fetchStaticPaths from "@/utils/fetchStaticPaths";
import type { SharedPageProps } from "@/utils/getSharedPageProps";
import getSharedPageProps from "@/utils/getSharedPageProps";
import type { Heading } from "@/utils/rehypeExtractHeadings";
import { serializeMarkdownSafe } from "@/utils/serializeMarkdown";

const StyledGrid = styled.div`
    display: flex;
    gap: 32px;

    & > :nth-child(1) {
        flex: 3;
        min-width: 0;
    }

    & > :nth-child(2) {
        flex: 1;

        @media (max-width: ${theme.breakpoints.mobileMax}) {
            display: none;
        }
    }
`;

const ArrowLink = styled(Link)`
    align-self: flex-start;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const propsQuery = graphql(`
    query DocumentPage($pageSlug: String!) {
        page(slug: $pageSlug) {
            name
            body
            createdAt
        }
    }
`);

const pathsQuery = graphql(`
    query DocumentPageAll {
        pagePagination {
            data {
                slug
            }
        }
    }
`);

export interface DocumentPageProps extends SharedPageProps {
    page: Omit<ResultOf<typeof propsQuery>, "body">;
    source: MDXRemoteSerializeResult;
    headings: Heading[];
}

interface DocumentPageParams extends ParsedUrlQuery {
    pageSlug: Array<string>;
}

export default function DocumentPage({ page, source, headings }: DocumentPageProps) {
    const author = typeof source.frontmatter?.author === "string" ? source.frontmatter.author : undefined;

    return (
        <>
            <PageHeader title={page.name} author={author} createdAt={page.created_at} />
            <StyledGrid>
                <SEO title={page.name} />
                <Markdown source={page.source} />
                <TableOfContents headings={headings} />
            </StyledGrid>
            <ArrowLink href="/wiki">
                <Icon icon={faArrowLeft} color="text-disabled" />
                <Text link color="text-disabled">
                    Back to overview
                </Text>
            </ArrowLink>
        </>
    );
}

interface PageHeaderProps {
    title: string;
    author?: string;
    createdAt: string;
}

function PageHeader({ title, author, createdAt }: PageHeaderProps) {
    return (
        <div>
            <Text variant="h1">{title}</Text>
            {!!author && (
                <Text variant="small" color="text-muted">
                    By: {author} &bull;{" "}
                </Text>
            )}
            <Text variant="small" color="text-muted">
                {new Date(createdAt).toLocaleDateString("en", { dateStyle: "long" })}
            </Text>
        </div>
    );
}

export const getStaticProps: GetStaticProps<DocumentPageProps, DocumentPageParams> = async ({ params }) => {
    const client = createApolloClient();

    const { data } = await client.query({
        query: propsQuery,
        params: params && {
            pageSlug: params.pageSlug.join("/"),
        },
    });

    if (!data.page) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            ...getSharedPageProps(),
            page: {
                ...data.page,
                ...(await serializeMarkdownSafe(data.page.body)),
            },
        },
        // Revalidate after 1 hour (= 3600 seconds).
        revalidate: 3600,
    };
};

export const getStaticPaths: GetStaticPaths<DocumentPageParams> = () => {
    const client = createApolloClient();

    return fetchStaticPaths(async () => {
        const { data } = await client.query({
            query: pathsQuery,
        });

        return data.pagePaginator.map((page) => ({
            params: {
                pageSlug: page.slug.split("/"),
            },
        }));
    });
};
