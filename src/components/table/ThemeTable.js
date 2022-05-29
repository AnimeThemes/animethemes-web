import { chain, themeIndexComparator, themeTypeComparator } from "utils/comparators";
import createVideoSlug from "utils/createVideoSlug";
import Link from "next/link";
import { Table } from "components/table";
import { Text } from "components/text";
import { SongTitle, ThemeEntryTags, VideoTags } from "components/utils";
import { ContentWarningTags, EpisodeTag } from "components/tag";
import { Row } from "components/box";
import gql from "graphql-tag";

export function ThemeTable({ themes }) {
    const rows = themes
        .filter((theme) => "entries" in theme && theme.entries.length && theme.entries[0].videos.length)
        .sort(chain(themeTypeComparator, themeIndexComparator))
        .map((theme) => theme.entries.map((entry, entryIndex) => entry.videos.map((video, videoIndex) => {
            const videoSlug = createVideoSlug(theme, entry, video);

            return (
                <Link key={theme.anime.slug + videoSlug} href={`/anime/${theme.anime.slug}/${videoSlug}`} passHref prefetch={false}>
                    <Table.Row as="a">
                        <Table.Cell style={{ "--span": (entryIndex || videoIndex) ? 2 : undefined }}>
                            {!videoIndex && (
                                entry.version > 1 ? (
                                    <Text variant="small" color="text-muted">{theme.type}{theme.sequence || null} v{entry.version}</Text>
                                ) : (
                                    <Text variant="small">{theme.type}{theme.sequence || null}</Text>
                                )
                            )}
                        </Table.Cell>
                        {(!entryIndex && !videoIndex) && (
                            <Table.Cell>
                                <SongTitle song={theme.song}/>
                            </Table.Cell>
                        )}
                        <Table.Cell>
                            {!videoIndex && (
                                <EpisodeTag entry={entry}/>
                            )}
                        </Table.Cell>
                        <Table.Cell>
                            {!videoIndex && (
                                <Row $wrap style={{ "--gap": "8px", "--align-items": "baseline" }}>
                                    <ContentWarningTags entry={entry}/>
                                </Row>
                            )}
                        </Table.Cell>
                        <Table.Cell>
                            <VideoTags video={video}/>
                        </Table.Cell>
                    </Table.Row>
                </Link>
            );
        })));

    return (
        <Table style={{ "--columns": "42px 3fr 2fr 2fr 2fr" }}>
            <Table.Head>
                <Table.HeadCell>Type</Table.HeadCell>
                <Table.HeadCell>Song Title</Table.HeadCell>
                <Table.HeadCell>Episode Count</Table.HeadCell>
                <Table.HeadCell>Content Warning</Table.HeadCell>
                <Table.HeadCell>Notes</Table.HeadCell>
            </Table.Head>
            <Table.Body>
                {rows}
            </Table.Body>
        </Table>
    );
}

ThemeTable.fragments = {
    theme: gql`
        ${createVideoSlug.fragments.theme}
        ${createVideoSlug.fragments.entry}
        ${createVideoSlug.fragments.video}
        ${VideoTags.fragment}
        ${ThemeEntryTags.fragment}
        
        fragment ThemeTable_theme on Theme {
            ...createVideoSlug_theme
            type
            sequence
            anime {
                slug
            }
            entries {
                ...createVideoSlug_entry
                ...ThemeEntryTags_entry
                videos {
                    ...createVideoSlug_video
                    ...VideoTags_video
                }
            }
            song {
                title
            }
        }
    `
};
