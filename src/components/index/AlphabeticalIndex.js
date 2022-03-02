import React from "react";
import Link from "next/link";
import { groupBy } from "lodash-es";
import { Text } from "components/text";
import styled from "styled-components";

const StyledLetterList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
`;

const StyledItemGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    justify-content: flex-start;
    grid-gap: 16px;
`;

export function AlphabeticalIndex({ items, children }) {
    const itemsByFirstLetter = Object.entries(
        groupBy(
            items.sort((a, b) => a.name.localeCompare(b.name)),
            (item) => {
                const firstLetter = item.name[0].toLowerCase();
                if (firstLetter.match(/[a-z]/)) {
                    return firstLetter;
                }
                return "0-9";
            }
        )
    )
        .sort(([ a ], [ b ]) => a.localeCompare(b));

    return (
        <>
            <StyledLetterList>
                {itemsByFirstLetter.map(([ firstLetter ]) => (
                    <Link key={firstLetter} href={`#${firstLetter}`} passHref>
                        <Text as="a" link>{firstLetter.toUpperCase()} </Text>
                    </Link>
                ))}
            </StyledLetterList>
            {itemsByFirstLetter.map(([ firstLetter, itemsWithFirstLetter ]) => (
                <React.Fragment key={firstLetter}>
                    <Text id={firstLetter} variant="h2">{firstLetter}</Text>
                    <StyledItemGrid>
                        {itemsWithFirstLetter.map((item) => children(item))}
                    </StyledItemGrid>
                </React.Fragment>
            ))}
        </>
    );
}
