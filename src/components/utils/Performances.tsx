import { Fragment, useState } from "react";
import Link from "next/link";

import { uniqBy } from "lodash-es";

import { Text } from "@/components/text/Text";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

export const STAFF_SONG = graphql(`
    fragment StaffSong on Song {
        id
        staff {
            id
            alias
            as
            relevance
            role
            artist {
                id
                slug
                name {
                    main
                }
            }
            member {
                id
                slug
                name {
                    main
                }
            }
        }
    }
`);

export const SONG_STAFF_ARTIST = graphql(`
    fragment SongStaffArtist on Artist {
        id
    }
`);

export interface PerformancesProps {
    song: FragmentType<typeof STAFF_SONG> | null;
    artist?: FragmentType<typeof SONG_STAFF_ARTIST>;
    maxPerformances?: number | null;
    expandable?: boolean;
}

interface FilterPerformancesFromStaffProps {
    role: string;
}

export function filterPerformancesFromStaff(staff: FilterPerformancesFromStaffProps): boolean {
    return staff.role === "Performance" || staff.role.toLowerCase().includes("feat");
}

interface ArtistNameProps {
    alias: string | null;
    as: string | null;
    artist: {
        name: {
            main: string;
        };
        slug: string;
    };
}

export function getDisplayedArtistName({ alias, artist, as }: ArtistNameProps) {
    const artistName = alias ?? artist.name.main;

    if (as) {
        return `${as} (CV: ${artistName})`;
    }

    return artistName;
}

export function Performances({
    song: songFragment,
    maxPerformances = 3,
    expandable = false,
}: PerformancesProps) {
    const song = getFragmentData(STAFF_SONG, songFragment);
    const [expandPerformances, setExpandPerformances] = useState(false);

    const songPerformances = song?.staff.filter(filterPerformancesFromStaff);

    if (!songPerformances?.length) {
        return null;
    }

    if (maxPerformances === null || expandPerformances) {
        maxPerformances = songPerformances.length;
    }

    const performances = uniqBy(songPerformances, (performance) => performance.artist.id).sort(
        (a, b) => a.relevance - b.relevance,
    );

    const isFeaturing = ({ role }: (typeof performances)[number]) => role.toLowerCase().includes("feat");

    const shown = performances.slice(0, maxPerformances);
    const performancesShown = shown.filter((p) => !isFeaturing(p));
    const featuringShown = shown.filter(isFeaturing);

    const performancesHidden = performances.slice(maxPerformances).filter((p) => !isFeaturing(p));

    const hasMore = performancesHidden.length > 0;

    return (
        <Text color="text-muted">
            <Text variant="small"> by </Text>
            <Text>
                {performancesShown.map((performance, index) => (
                    <Fragment key={performance.artist.slug}>
                        {index > 0 && (index === performancesShown.length - 1 && !hasMore ? " & " : ", ")}
                        <Text as={Link} href={`/artist/${performance.artist.slug}`} link>
                            {getDisplayedArtistName(performance)}
                        </Text>
                    </Fragment>
                ))}
                {featuringShown.length > 0 && " feat. "}
                {featuringShown.map((featuring, index) => (
                    <Fragment key={featuring.artist.slug}>
                        {index > 0 && (index === featuringShown.length - 1 && !hasMore ? " & " : ", ")}
                        <Text as={Link} href={`/artist/${featuring.artist.slug}`} link>
                            {getDisplayedArtistName(featuring)}
                        </Text>
                    </Fragment>
                ))}
                {hasMore && shown.length > 0 && " & "}
                {hasMore && (
                    <Text link onClick={() => expandable && setExpandPerformances(true)}>
                        {performancesHidden.length} more
                    </Text>
                )}
            </Text>
        </Text>
    );
}
