import { useMemo, useState } from "react";
import { Box } from "components/box";
import { Switcher } from "components/switcher";
import { ThemeDetailCard } from "components/card";

export function ThemeGroupFilter({ themes }) {
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

    const [activeGroup, setActiveGroup] = useState(groups[0].name);
    const activeThemes = groups.find((group) => group.name === activeGroup).themes;

    return (
        <Box gapsColumn="1rem">
            {groups.length > 1 && (
                <Switcher
                    items={groups.map((group) => group.name)}
                    selectedItem={activeGroup}
                    onChange={setActiveGroup}
                />
            )}
            {activeThemes.map((theme, index) => (
                <ThemeDetailCard key={index} theme={theme} />
            ))}
        </Box>
    );
}
