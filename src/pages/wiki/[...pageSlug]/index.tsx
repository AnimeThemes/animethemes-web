import { fetchData } from "lib/server";
import type { Heading, Markdown } from "utils/markdownToHtml";
import markdownToHtml from "utils/markdownToHtml";
import { unified } from "unified";
import rehypeReact from "rehype-react";
import { Text } from "components/text";
import type { ComponentPropsWithoutRef } from "react";
import { createElement, Fragment, useEffect, useState } from "react";
import rehypeParse from "rehype-parse";
import styled from "styled-components";
import { m } from "framer-motion";
import theme from "theme";
import { SEO } from "components/seo";
import fetchStaticPaths from "utils/fetchStaticPaths";
import gql from "graphql-tag";
import type { SharedPageProps } from "utils/getSharedPageProps";
import getSharedPageProps from "utils/getSharedPageProps";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { DocumentPageAllQuery, DocumentPageQuery, DocumentPageQueryVariables } from "generated/graphql";
import { TextLink } from "components/text/TextLink";
import type { RequiredNonNullable } from "utils/types";

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

const StyledMarkdown = styled.div`
    line-height: 1.75;
    word-break: break-word;
    
    & h1 {
        margin-bottom: 32px;
    }

    & h2 {
        margin-bottom: 24px;
        font-size: 1.2rem;
    }

    & h3 {
        margin-bottom: 16px;
    }
    
    & p + h2 {
        margin-top: 48px;
    }

    & p + h3 {
        margin-top: 32px;
    }

    & p {
        margin-bottom: 16px;
    }

    & table {
        width: 100%;
        table-layout: auto;
        text-align: left;
        border-collapse: collapse;
    }

    & thead {
        border-bottom: 1px solid ${theme.colors["text-muted"]};

        & th {
            font-weight: 600;
            vertical-align: bottom;
            padding-left: 8px;
            padding-right: 8px;
            padding-bottom: 8px;

            &:first-child {
                padding-left: 0;
            }

            &:last-child {
                padding-right: 0;
            }
        }
    }

    & tbody tr {
        border-bottom: 1px solid ${theme.colors["text-disabled"]};

        &:last-child {
            border-bottom-width: 0;
        }
    }

    & tbody td {
        vertical-align: baseline;
        padding: 8px;

        &:first-child {
            padding-left: 0;
        }

        &:last-child {
            padding-right: 0;
        }
    }
    
    & pre {
        margin-bottom: 16px;
        overflow-x: auto;
    }
    
    & pre > code {
        display: block;
        min-width: 100%;
        width: max-content;
        padding: 16px;
    }
`;

const StyledTableOfContents = styled.ul`
    position: sticky;
    // TODO: Magic value neccessary?
    top: 92px;
    align-self: flex-start;
    
    display: flex;
    flex-direction: column;
    gap: 16px;

    max-height: calc(100vh - 92px);
    padding-left: 16px;
    padding-bottom: 16px;
    
    list-style: none;
    overflow-y: auto;
    
    & > li {
        position: relative;
        
        display: flex;
        align-items: center;
    }
`;

const StyledTableOfContentsHeading = styled.li<{ $depth: number }>`
    padding-left: ${(props) => props.$depth === 3 && "16px"};
    font-size: ${(props) => props.$depth === 3 && "0.9rem"};
`;

const StyledDot = styled(m.div)`
    position: absolute;
    left: -16px;
    width: 4px;
    height: 100%;
    border-radius: 4px;
    background-color: ${theme.colors["text-primary"]};
`;

interface DocumentPageProps extends SharedPageProps {
    page: Omit<RequiredNonNullable<DocumentPageQuery>["page"], "body"> & {
        body: Markdown
    }
}

interface DocumentPageParams extends ParsedUrlQuery {
    pageSlug: Array<string>
}

export default function DocumentPage({ page }: DocumentPageProps) {
    const components = unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeReact, {
            createElement,
            Fragment,
            components: {
                a: (props: ComponentPropsWithoutRef<"a">) => {
                    const { href } = props;

                    if (href?.startsWith("/")) {
                        return <TextLink href={href} {...props}/>;
                    }

                    return <Text as="a" link href={href} {...props}/>;
                },
                h1: (props: ComponentPropsWithoutRef<typeof Text>) => <Text variant="h1" {...props}/>,
                h2: (props: ComponentPropsWithoutRef<typeof Text>) => <Text variant="h2" {...props}/>,
                h3: (props: ComponentPropsWithoutRef<typeof Text>) => <Text variant="h2" as="h3" {...props}/>,
                code: (props: ComponentPropsWithoutRef<typeof Text>) => <Text variant="code" {...props}/>
            }
        })
        .processSync(page.body.html).result;

    return (
        <StyledGrid>
            <SEO title={page.name}/>
            <StyledMarkdown>
                {components}
            </StyledMarkdown>
            <TableOfContents headings={page.body.headings}/>
        </StyledGrid>
    );
}

function TableOfContents({ headings }: { headings: Array<Heading> }) {
    const [currentSlug, setCurrentSlug] = useState<string | undefined>();

    useEffect(() => {
        function onScroll() {
            const headings = [...document.querySelectorAll<HTMLHeadingElement>("h2, h3")];

            let currentHeading = null;
            for (const heading of headings) {
                if (heading.offsetTop > window.scrollY + window.innerHeight) {
                    break;
                }
                currentHeading = heading;
                if (heading.offsetTop > window.scrollY) {
                    break;
                }
            }
            setCurrentSlug(currentHeading?.id);
        }

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <StyledTableOfContents>
            {headings.map(({ text, slug, depth }) => (
                <StyledTableOfContentsHeading key={slug} $depth={depth}>
                    {slug === currentSlug && (
                        <StyledDot layoutId="dot"/>
                    )}
                    <Text as="a" link color={slug === currentSlug ? "text-muted" : "text-disabled"} href={`#${slug}`}>{text}</Text>
                </StyledTableOfContentsHeading>
            ))}
        </StyledTableOfContents>
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
                body: markdownToHtml(data.page.body)
            }
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
