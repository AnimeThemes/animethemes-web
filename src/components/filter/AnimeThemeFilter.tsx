import { memo, useMemo, useState } from "react";
import { Column, Row } from "components/box";
import { ThemeDetailCard } from "components/card";
import { HorizontalScroll } from "components/utils";
import { either, themeGroupComparator, themeIndexComparator, themeTypeComparator } from "utils/comparators";
import gql from "graphql-tag";
import type { AnimeThemeFilterThemeFragment } from "generated/graphql";
import { Listbox, ListboxOption } from "components/listbox/Listbox";
import { Text } from "components/text/Text";

interface AnimeThemeFilterProps {
    themes: Array<AnimeThemeFilterThemeFragment>
}

function AnimeThemeFilterInternal({ themes }: AnimeThemeFilterProps) {
    const hasMultipleTypes = (
        themes.some((theme) => theme.type === "OP") &&
        themes.some((theme) => theme.type === "ED")
    );
    const [ filterType, setFilterType ] = useState<string | null>(null);

    const filteredThemes = themes
        .filter((theme) => !filterType || theme.type === filterType)
        .sort(either(themeGroupComparator).or(themeTypeComparator).or(themeIndexComparator).chain());

    const groups = useMemo(
        () => filteredThemes.reduce<{
            name: string,
            slug: string,
            themes: typeof themes
        }[]>(
            (groups, theme) => {
                const groupName = theme.group?.name || "Original";
                const groupSlug = theme.group?.slug || "original";
                const group = groups.find((group) => group.name === groupName);
                if (!group) {
                    groups.push({
                        name: groupName,
                        slug: groupSlug,
                        themes: [theme],
                    });
                } else {
                    group.themes.push(theme);
                }
                return groups;
            },
            []
        ),
        [ filteredThemes ]
    );

    const [ activeGroup, setActiveGroup ] = useState<string | null>(null);
    const activeGroupThemes = groups.find((group) => group.slug === activeGroup)?.themes;

    return (
        <Column style={{ "--gap": "24px" }}>
            {(groups.length > 1 || hasMultipleTypes) && (
                <HorizontalScroll fixShadows>
                    <Row style={{ "--gap": "16px" }}>
                        {groups.length > 1 && (
                            <Listbox value={activeGroup} onValueChange={setActiveGroup} defaultValue={null} resettable nullable highlightNonDefault>
                                <ListboxOption value={null} hidden>All Groups</ListboxOption>
                                {groups.map((group) => (
                                    <ListboxOption key={group.slug} value={group.slug}>{group.name}</ListboxOption>
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
            <Column style={{ "--gap": "48px" }}>
                {activeGroupThemes ? (
                    <Column style={{ "--gap": "16px" }}>
                        {activeGroupThemes.map((theme) => (
                            <ThemeDetailCard key={theme.id} theme={theme} />
                        ))}
                    </Column>
                ) : groups.map((group) => (
                    <Column key={group.slug} style={{ "--gap": "16px" }}>
                        {groups.length > 1 && (
                            <Text variant="h3">{group.name}</Text>
                        )}
                        {group.themes.map((theme) => (
                            <ThemeDetailCard key={theme.id} theme={theme} />
                        ))}
                    </Column>
                ))}
            </Column>
        </Column>
    );
}

AnimeThemeFilterInternal.fragments = {
    theme: gql`
        ${ThemeDetailCard.fragments.theme}
        
        fragment AnimeThemeFilterTheme on Theme {
            ...ThemeDetailCardTheme
            type
            group {
                name
                slug
            }
        }
    `
};

export const AnimeThemeFilter = memo(AnimeThemeFilterInternal);
