import Link from "next/link";

import gql from "graphql-tag";

import { Row } from "@/components/box/Flex";
import { Table } from "@/components/table/Table";
import { TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "@/components/table/Table";
import { ContentWarningTags } from "@/components/tag/ContentWarningTags";
import { EpisodeTag } from "@/components/tag/EpisodeTag";
import { VideoTags } from "@/components/tag/VideoTags";
import { Text } from "@/components/text/Text";
import { SongTitle } from "@/components/utils/SongTitle";
import type { ThemeTableThemeFragment } from "@/generated/graphql";
import { either, themeIndexComparator, themeTypeComparator } from "@/utils/comparators";
import createVideoSlug from "@/utils/createVideoSlug";

export interface ThemeTableProps {
    themes: Array<ThemeTableThemeFragment>
    onPlay?(initiatingThemeId: number, entryIndex?: number, videoIndex?: number): void
}

export function ThemeTable({ themes, onPlay }: ThemeTableProps) {
    const rows = themes
        .filter((theme) => theme.anime && theme.entries.length && theme.entries[0]?.videos.length)
        .sort(either(themeTypeComparator).or(themeIndexComparator).chain())
        .map((theme) => theme.entries.map((entry, entryIndex) => entry.videos.map((video, videoIndex) => {
            const anime = theme.anime as NonNullable<typeof theme["anime"]>;
            const videoSlug = createVideoSlug(theme, entry, video);
            return (
                <Link
                    key={anime.slug + videoSlug}
                    href={`/anime/${anime.slug}/${videoSlug}`}
                    passHref
                    legacyBehavior
                >
                    <TableRow as="a" onClick={()=> onPlay?.(theme.id, entryIndex, videoIndex)}>
                        <TableCell style={{ "--span": (entryIndex || videoIndex) ? 2 : undefined }}>
                            {!videoIndex && (
                                (entry.version ?? 1) > 1 ? (
                                    <Text variant="small" color="text-muted">{theme.type}{theme.sequence || null} v{entry.version}</Text>
                                ) : (
                                    <Text variant="small">{theme.type}{theme.sequence || null}</Text>
                                )
                            )}
                        </TableCell>
                        {(!entryIndex && !videoIndex) && (
                            <TableCell>
                                <SongTitle song={theme.song}/>
                            </TableCell>
                        )}
                        <TableCell>
                            {!videoIndex && (
                                <EpisodeTag entry={entry}/>
                            )}
                        </TableCell>
                        <TableCell>
                            {!videoIndex && (
                                <Row $wrap style={{ "--gap": "8px", "--align-items": "baseline" }}>
                                    <ContentWarningTags entry={entry}/>
                                </Row>
                            )}
                        </TableCell>
                        <TableCell>
                            <VideoTags video={video}/>
                        </TableCell>
                    </TableRow>
                </Link>
            );
        })));

    return (
        <Table style={{ "--columns": "42px 3fr 2fr 2fr 2fr" }}>
            <TableHead>
                <TableHeadCell>Type</TableHeadCell>
                <TableHeadCell>Song Title</TableHeadCell>
                <TableHeadCell>Episode Count</TableHeadCell>
                <TableHeadCell>Content Warning</TableHeadCell>
                <TableHeadCell>Notes</TableHeadCell>
            </TableHead>
            <TableBody>
                {rows}
            </TableBody>
        </Table>
    );
}

ThemeTable.fragments = {
    theme: gql`
        ${createVideoSlug.fragments.theme}
        ${createVideoSlug.fragments.entry}
        ${createVideoSlug.fragments.video}
        ${EpisodeTag.fragments.entry}
        ${ContentWarningTags.fragments.entry}
        ${VideoTags.fragments.video}
        
        fragment ThemeTableTheme on Theme {
            ...createVideoSlugTheme
            id
            type
            sequence
            anime {
                slug
            }
            entries {
                ...createVideoSlugEntry
                ...EpisodeTagEntry
                ...ContentWarningTagsEntry
                videos {
                    ...createVideoSlugVideo
                    ...VideoTagsVideo
                }
            }
            song {
                title
            }
        }
    `
};
