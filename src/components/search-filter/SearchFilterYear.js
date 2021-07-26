import { Text } from "components/text";
import { Listbox } from "components/listbox";
import { Flex } from "components/box";
import { graphql, useStaticQuery } from "gatsby";

export function SearchFilterYear({ value, setValue }) {
    const yearList = useStaticQuery(graphql`
        query {
            allAnime {
                groupedByYear: group(field: year) {
                    year: fieldValue
                }
            }
        }
    `).allAnime.groupedByYear
        .map((node) => node.year)
        .sort()
        .reverse();

    return (
        <Flex flexDirection="column" alignItems="stretch" gapsColumn="0.5rem">
            <Text variant="h2">Year</Text>
            <Listbox
                options={yearList}
                selectedValue={value}
                onSelect={setValue}
                nullLabel="Any"
            />
        </Flex>
    );
}
