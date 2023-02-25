import { fetchData } from "lib/server";
import styled from "styled-components";
import theme from "theme";
import { SEO } from "components/seo";
import fetchStaticPaths from "utils/fetchStaticPaths";
import gql from "graphql-tag";
import type { SharedPageProps } from "utils/getSharedPageProps";
import getSharedPageProps from "utils/getSharedPageProps";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { DocumentPageAllQuery, DocumentPageQuery, DocumentPageQueryVariables } from "generated/graphql";
import type { RequiredNonNullable } from "utils/types";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import serializeMarkdown from "utils/serializeMarkdown";
import type { Heading } from "utils/rehypeExtractHeadings";
import { Markdown } from "components/markdown/Markdown";
import { TableOfContents } from "components/markdown/TableOfContents";

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

export interface DocumentPageProps extends SharedPageProps {
    page: Omit<RequiredNonNullable<DocumentPageQuery>["page"], "body"> & {
        source: MDXRemoteSerializeResult;
        headings: Heading[];
    }
}

interface DocumentPageParams extends ParsedUrlQuery {
    pageSlug: Array<string>
}

export default function DocumentPage({ page }: DocumentPageProps) {
    return (
        <StyledGrid>
            <SEO title={page.name}/>
            <Markdown source={page.source} />
            <TableOfContents headings={page.headings} />
        </StyledGrid>
    );
}

export const getStaticProps: GetStaticProps<DocumentPageProps, DocumentPageParams> = async ({ params }) => {
    const { data, apiRequests } = await fetchData<DocumentPageQuery, DocumentPageQueryVariables>(gql`
        query DocumentPage($pageSlug: String!) {
            page(slug: $pageSlug) {
                name
                body
            }
        }
    `, params && {
        pageSlug: params.pageSlug.join("/")
    });

    if (!data.page) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            ...getSharedPageProps(apiRequests),
            page: {
                ...data.page,
                ...await serializeMarkdown(data.page.body),
            },
        },
        // Revalidate after 1 hour (= 3600 seconds).
        revalidate: 3600
    };
};

export const getStaticPaths: GetStaticPaths<DocumentPageParams> = () => {
    return fetchStaticPaths(async () => {
        const { data } = await fetchData<DocumentPageAllQuery>(gql`
            query DocumentPageAll {
                pageAll {
                    slug
                }
            }
        `);

        return data.pageAll.map((page) => ({
            params: {
                pageSlug: page.slug.split("/")
            }
        }));
    });
};
