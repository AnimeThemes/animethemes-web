import React from "react";
import Link from "next/link";
import { Flex, Grid } from "components/box";
import { groupBy } from "lodash";
import { Text } from "components/text";

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
            <Flex justifyContent="center" gap="0.5rem" flexWrap="wrap">
                {itemsByFirstLetter.map(([ firstLetter ]) => (
                    <Link key={firstLetter} href={`#${firstLetter}`} passHref>
                        <Text as="a" link>{firstLetter.toUpperCase()} </Text>
                    </Link>
                ))}
            </Flex>
            {itemsByFirstLetter.map(([ firstLetter, itemsWithFirstLetter ]) => (
                <React.Fragment key={firstLetter}>
                    <Text id={firstLetter} variant="h2">{firstLetter}</Text>
                    <Grid gridTemplateColumns={[ "1fr", "1fr 1fr" ]} gridGap="1rem" justifyItems="flex-start">
                        {itemsWithFirstLetter.map((item) => children(item))}
                    </Grid>
                </React.Fragment>
            ))}
        </>
    );
}
