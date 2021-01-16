import React, {useMemo, useState} from "react";
import ThemeCard from "components/card/theme";
import { Box } from "components/flex";
import Button from "components/button";
import Switcher from "components/switcher";

export default function ThemeSwitcher({ themes }) {
    const groups = useMemo(() => themes.reduce((groups, theme) => {
        const group = groups.find((group) => group.name === theme.group);
        if (!group) {
            groups.push({
                name: theme.group,
                themes: [theme],
            });
        } else {
            group.themes.push(theme);
        }
        return groups;
    }, []), [ themes ]);

    const [activeGroup, setActiveGroup] = useState(groups[0]);

    return (
        <Box gapsColumn="1rem">
            {groups.length > 1 && (
                <Switcher>
                    {groups.map((group) => (
                        <Button
                            key={group.name}
                            active={activeGroup === group}
                            onClick={() => setActiveGroup(group)}
                        >
                            {group.name || "Original"}
                        </Button>
                    ))}
                </Switcher>
            )}
            {activeGroup.themes.map((theme, index) => (
                <ThemeCard key={index} theme={theme} />
            ))}
        </Box>
    );
}
