import { memo, useMemo, useState } from "react";
import { Column, Row } from "components/box";
import { ThemeDetailCard } from "components/card";
import { Listbox } from "components/listbox";
import { HorizontalScroll } from "components/utils";
import { chain, themeIndexComparator, themeTypeComparator } from "utils/comparators";

export const AnimeThemeFilter = memo(function AnimeThemeFilter({ themes }) {
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

    const filteredThemes = activeThemes
        .filter((theme) => !filterType || theme.type === filterType)
        .sort(chain(themeTypeComparator, themeIndexComparator));

    return (
        <Column style={{ "--gap": "16px" }}>
            {(groups.length > 1 || hasMultipleTypes) && (
                <HorizontalScroll fixShadows>
                    <Row style={{ "--gap": "16px" }}>
                        {groups.length > 1 && (
                            <Listbox value={activeGroup} onChange={setActiveGroup}>
                                {groups.map((group) => (
                                    <Listbox.Option key={group.name} value={group.name}>{group.name}</Listbox.Option>
                                ))}
                            </Listbox>
                        )}
                        {hasMultipleTypes && (
                            <Listbox value={filterType} onChange={setFilterType} resettable highlightNonDefault>
                                <Listbox.Option value={null} hidden>OP & ED</Listbox.Option>
                                <Listbox.Option value="OP">OP</Listbox.Option>
                                <Listbox.Option value="ED">ED</Listbox.Option>
                            </Listbox>
                        )}
                    </Row>
                </HorizontalScroll>
            )}
            {filteredThemes.map((theme, index) => (
                <ThemeDetailCard key={index} theme={theme} />
            ))}
        </Column>
    );
});
