import Link from "next/link";
import { fetchData } from "lib/server";
import markdownToHtml from "utils/markdownToHtml";
import { unified } from "unified";
import rehypeReact from "rehype-react";
import { Text } from "components/text";
import { createElement, Fragment, useEffect, useState } from "react";
import rehypeParse from "rehype-parse";
import styled from "styled-components";
import { motion } from "framer-motion";
import theme from "theme";
import { SEO } from "components/seo";

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
    
    & h1 {
        margin-bottom: 32px;
    }

    & h2 {
        margin-bottom: 24px;
        font-size: 1.2rem;
    }
    
    & p + h2 {
        margin-top: 48px;
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
    
    list-style: none;
    padding-left: 16px;
    
    & > li {
        position: relative;
        
        display: flex;
        align-items: center;
    }
`;

const StyledDot = styled(motion.div)`
    position: absolute;
    left: -16px;
    width: 4px;
    height: 100%;
    border-radius: 4px;
    background-color: ${theme.colors["text-primary"]};
`;

export default function DocumentPage({ page }) {
    const components = unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeReact, {
            createElement,
            Fragment,
            components: {
                a: ({ children, href, ...props }) => {
                    if (href.startsWith("/")) {
                        return (
                            <Link href={href} passHref>
                                <Text as="a" link {...props}>{children}</Text>
                            </Link>
                        );
                    }

                    return <Text as="a" link href={href} {...props}>{children}</Text>;
                },
                h1: ({ children, ...props }) => <Text variant="h1" {...props}>{children}</Text>,
                h2: ({ children, ...props }) => <Text variant="h2" {...props}>{children}</Text>,
                code: ({ children, ...props }) => <Text variant="code" {...props}>{children}</Text>
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

function TableOfContents({ headings }) {
    const [currentSlug, setCurrentSlug] = useState();

    useEffect(() => {
        function onScroll() {
            const headings = [...document.querySelectorAll("h2")];

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
            {headings.map(({ text, slug }) => (
                <li key={text}>
                    {slug === currentSlug && (
                        <StyledDot layoutId="dot"/>
                    )}
                    <Text as="a" link color={slug === currentSlug ? "text-muted" : "text-disabled"} href={`#${slug}`}>{text}</Text>
                </li>
            ))}
        </StyledTableOfContents>
    );
}

export async function getStaticProps({ params: { pageSlug } }) {
    const { data } = await fetchData(`
        #graphql

        query($pageSlug: String!) {
            page(slug: $pageSlug) {
                name
                body
            }
        }
    `, {
        pageSlug: pageSlug.join("/")
    });

    if (!data.page) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            page: {
                ...data.page,
                body: markdownToHtml(data.page.body)
            }
        },
        revalidate: 5 * 60
    };
}

export async function getStaticPaths() {
    const { data } = await fetchData(`
        #graphql

        query {
            pageAll {
                slug
            }
        }
    `);

    const paths = data.pageAll.map((page) => ({
        params: {
            pageSlug: page.slug.split("/")
        }
    }));

    return {
        paths,
        fallback: "blocking"
    };
}
