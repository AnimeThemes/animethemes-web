import { ContentWarningTags, EpisodeTag } from "components/tag";
import { Row } from "components/box";
import gql from "graphql-tag";

export function ThemeEntryTags({ entry }) {
    return (
        <Row style={{ "--gap": "8px", "--align-items": "baseline" }}>
            <EpisodeTag entry={entry}/>
            <ContentWarningTags entry={entry}/>
        </Row>
    );
}

ThemeEntryTags.fragment = gql`
    fragment ThemeEntryTags_entry on Entry {
        episodes
        spoiler
        nsfw
    }
`;
