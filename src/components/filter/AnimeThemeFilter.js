import { useMemo, useState } from "react";
import { Box, Flex } from "components/box";
import { Switcher } from "components/switcher";
import { ThemeDetailCard } from "components/card";
import { Listbox } from "components/listbox";
import { HorizontalScroll } from "components/utils";

export function AnimeThemeFilter({ themes }) {
    const groups = useMemo(() => themes.reduce((groups, theme) => {
        const groupName = theme.group || "Original";
        const group = groups.find((group) => group.name === groupName);
        if (!group) {
            groups.push({
                name: groupName,
                themes: [theme],
            });
        } else {
            group.themes.push(theme);
        }
        return groups;
    }, []), [ themes ]);

    const [ activeGroup, setActiveGroup ] = useState(groups[0].name);
    const activeThemes = groups.find((group) => group.name === activeGroup).themes;

    const hasMultipleTypes = activeThemes.find((theme) => theme.type === "OP") && activeThemes.find((theme) => theme.type === "ED");
    const [ filterType, setFilterType ] = useState(null);

    const filteredThemes = activeThemes.filter((theme) => !filterType || theme.type === filterType);

    return (
        <Box gapsColumn="1rem">
            {(groups.length > 1 || hasMultipleTypes) && (
                <HorizontalScroll>
                    <Flex gapsRow="1rem">
                        {groups.length > 1 && (
                            <Switcher
                                items={groups.map((group) => group.name)}
                                selectedItem={activeGroup}
                                onChange={setActiveGroup}
                            />
                        )}
                        {hasMultipleTypes && (
                            <Listbox
                                selectedValue={filterType}
                                onSelect={setFilterType}
                                options={[
                                    "OP",
                                    "ED"
                                ]}
                                nullLabel="OP & ED"
                            />
                        )}
                    </Flex>
                </HorizontalScroll>
            )}
            {filteredThemes.map((theme, index) => (
                <ThemeDetailCard key={index} theme={theme} />
            ))}
        </Box>
    );
}
