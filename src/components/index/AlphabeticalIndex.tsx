import React from "react";
import type { ReactNode } from "react";
import styled from "styled-components";
import Link from "next/link";

import { groupBy } from "lodash-es";

import { Text } from "@/components/text/Text";

const StyledLetterList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
`;

const StyledItemGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    justify-content: flex-start;
    justify-items: flex-start;
    grid-gap: 16px;
`;

type AlphabeticalIndexItem = { name: string };

type AlphabeticalIndexProps<T extends AlphabeticalIndexItem> = {
    items: Array<T>;
    children: (item: T) => ReactNode;
};

export function AlphabeticalIndex<T extends AlphabeticalIndexItem>({ items, children }: AlphabeticalIndexProps<T>) {
    const itemsByFirstLetter = Object.entries(
        groupBy(
            [...items].sort((a, b) => a.name.localeCompare(b.name)),
            (item) => {
                const firstLetter = item.name[0].toLowerCase();
                if (firstLetter.match(/[a-z]/)) {
                    return firstLetter;
                }
                return "0-9";
            },
        ),
    ).sort(([a], [b]) => a.localeCompare(b));

    return (
        <>
            <StyledLetterList>
                {itemsByFirstLetter.map(([firstLetter]) => (
                    <Text key={firstLetter} as={Link} href={`#${firstLetter}`} link>
                        {firstLetter.toUpperCase()}{" "}
                    </Text>
                ))}
            </StyledLetterList>
            {itemsByFirstLetter.map(([firstLetter, itemsWithFirstLetter]) => (
                <React.Fragment key={firstLetter}>
                    <Text id={firstLetter} variant="h2">
                        {firstLetter}
                    </Text>
                    <StyledItemGrid>{itemsWithFirstLetter.map((item) => children(item))}</StyledItemGrid>
                </React.Fragment>
            ))}
        </>
    );
}
