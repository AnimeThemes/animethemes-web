import { ContentWarningTags, EpisodeTag } from "components/tag";
import { Row } from "components/box";
import gql from "graphql-tag";
import type { ThemeEntryTagsEntryFragment } from "generated/graphql";

type ThemeEntryTagsProps = {
    entry: ThemeEntryTagsEntryFragment
};

export function ThemeEntryTags({ entry }: ThemeEntryTagsProps) {
    return (
        <Row style={{ "--gap": "8px", "--align-items": "baseline" }}>
            <EpisodeTag entry={entry}/>
            <ContentWarningTags entry={entry}/>
        </Row>
    );
}

ThemeEntryTags.fragments = {
    entry: gql`
        ${EpisodeTag.fragments.entry}
        ${ContentWarningTags.fragments.entry}
        
        fragment ThemeEntryTagsEntry on Entry {
            ...EpisodeTagEntry
            ...ContentWarningTagsEntry
        }
    `
};
