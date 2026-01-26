import { Row } from "@/components/box/Flex";
import { ContentWarningTags } from "@/components/tag/ContentWarningTags";
import { EpisodeTag } from "@/components/tag/EpisodeTag";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

const fragments = {
    entry: graphql(`
        fragment ThemeEntryTagsEntry on AnimeThemeEntry {
            ...EpisodeTagEntry
            ...ContentWarningTagsEntry
        }
    `),
};

interface ThemeEntryTagsProps {
    entry: FragmentType<typeof fragments.entry>;
}

export function ThemeEntryTags({ entry: entryFragment }: ThemeEntryTagsProps) {
    const entry = getFragmentData(fragments.entry, entryFragment);

    return (
        <Row style={{ "--gap": "8px", "--align-items": "baseline" }}>
            <EpisodeTag entry={entry} />
            <ContentWarningTags entry={entry} />
        </Row>
    );
}
