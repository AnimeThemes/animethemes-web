import type { Heading } from "utils/rehypeExtractHeadings";
import { useEffect, useState } from "react";
import { Text } from "components/text";
import styled from "styled-components";
import { m } from "framer-motion";
import theme from "theme";

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

export function TableOfContents({ headings }: { headings: Array<Heading> }) {
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
