import { Row } from "@/components/box/Flex";
import { ContentWarningTags } from "@/components/tag/ContentWarningTags";
import { EpisodeTag } from "@/components/tag/EpisodeTag";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

export const THEME_ENTRY_TAGS_ENTRY = graphql(`
    fragment ThemeEntryTagsEntry on Entry {
        ...EpisodeTagEntry
        ...ContentWarningTagsEntry
    }
`);

interface ThemeEntryTagsProps {
    entry: FragmentType<typeof THEME_ENTRY_TAGS_ENTRY>;
}

export function ThemeEntryTags({ entry: entryFragment }: ThemeEntryTagsProps) {
    const entry = getFragmentData(THEME_ENTRY_TAGS_ENTRY, entryFragment);

    return (
        <Row style={{ "--gap": "8px", "--align-items": "baseline" }}>
            <EpisodeTag entry={entry} />
            <ContentWarningTags entry={entry} />
        </Row>
    );
}
