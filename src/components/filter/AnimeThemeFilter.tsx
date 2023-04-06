import { memo, useMemo, useState } from "react";
import { Column, Row } from "components/box";
import { ThemeDetailCard } from "components/card";
import { HorizontalScroll } from "components/utils";
import { either, themeIndexComparator, themeTypeComparator } from "utils/comparators";
import gql from "graphql-tag";
import type { AnimeThemeFilterThemeFragment } from "generated/graphql";
import { Listbox, ListboxOption } from "components/listbox/Listbox";

interface AnimeThemeFilterProps {
    themes: Array<AnimeThemeFilterThemeFragment>
}

function AnimeThemeFilterInternal({ themes }: AnimeThemeFilterProps) {
    const groups = useMemo(
        () => themes.reduce<{
            name: string,
            themes: typeof themes
        }[]>(
            (groups, theme) => {
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
            },
            []
        ),
        [ themes ]
    );

    const [ activeGroup, setActiveGroup ] = useState(groups[0]?.name);
    const activeThemes = groups.find((group) => group.name === activeGroup)?.themes ?? [];

    const hasMultipleTypes = activeThemes.find((theme) => theme.type === "OP") && activeThemes.find((theme) => theme.type === "ED");
    const [ filterType, setFilterType ] = useState<string | null>(null);

    const filteredThemes = activeThemes
        .filter((theme) => !filterType || theme.type === filterType)
        .sort(either(themeTypeComparator).or(themeIndexComparator).chain());

    return (
        <Column style={{ "--gap": "16px" }}>
            {(groups.length > 1 || hasMultipleTypes) && (
                <HorizontalScroll fixShadows>
                    <Row style={{ "--gap": "16px" }}>
                        {groups.length > 1 && (
                            <Listbox value={activeGroup} onValueChange={setActiveGroup}>
                                {groups.map((group) => (
                                    <ListboxOption key={group.name} value={group.name}>{group.name}</ListboxOption>
                                ))}
                            </Listbox>
                        )}
                        {hasMultipleTypes && (
                            <Listbox value={filterType} onValueChange={setFilterType} defaultValue={null} resettable nullable highlightNonDefault>
                                <ListboxOption value={null} hidden>OP & ED</ListboxOption>
                                <ListboxOption value="OP">OP</ListboxOption>
                                <ListboxOption value="ED">ED</ListboxOption>
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
}

AnimeThemeFilterInternal.fragments = {
    theme: gql`
        ${ThemeDetailCard.fragments.theme}
        
        fragment AnimeThemeFilterTheme on Theme {
            ...ThemeDetailCardTheme
            type
            group
        }
    `
};

export const AnimeThemeFilter = memo(AnimeThemeFilterInternal);
