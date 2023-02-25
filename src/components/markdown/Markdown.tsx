import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { MDXRemote } from "next-mdx-remote";
import type { ComponentPropsWithoutRef } from "react";
import { TextLink } from "components/text/TextLink";
import { Text } from "components/text";
import { Card } from "components/card";
import styled from "styled-components";
import theme from "theme";
import type { MDXComponents } from "mdx/types";

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
    
    & p + h2, & ul + h2, & ol + h2, & ${Card} + h2, & pre + h2 {
        margin-top: 48px;
    }

    & p + h3, & ul + h3, & ol + h3, & ${Card} + h3, & pre + h3 {
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
    
    & ${Card} {
        margin-bottom: 16px;
    }
`;

interface MarkdownProps {
    source: MDXRemoteSerializeResult;
    components?: MDXComponents;
}

export function Markdown({ source, components = {} }: MarkdownProps) {
    return (
        <StyledMarkdown>
            <MDXRemote
                {...source}
                components={{
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
                    code: (props: ComponentPropsWithoutRef<typeof Text>) => <Text variant="code" {...props}/>,
                    Card,
                    ...components,
                }}
            />
        </StyledMarkdown>
    );
}