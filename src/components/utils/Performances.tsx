import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

import { uniqBy } from "lodash-es";

import { Text } from "@/components/text/Text";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

const StyledArtist = styled(Text)<{ $featuring?: boolean }>`
    &:not(:first-of-type)::before {
        content: ${({ $featuring }) => ($featuring ? '" featuring "' : '", "')};
        font-size: 0.8rem;
        font-weight: 700;
    }

    &:not(:first-of-type):last-of-type::before {
        content: ${({ $featuring }) => ($featuring ? '" featuring "' : '" & "')};
    }
`;

const StyledArtistLink = styled(Text).attrs({ as: "a", link: true })`
    font-size: 1rem;
`;

export const STAFF_SONG = graphql(`
    fragment StaffSong on Song {
        staff {
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
    return staff.role === "Performance" || staff.role.toLowerCase().indexOf("feat") > -1;
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
    artist: artistFragment,
    maxPerformances = 3,
    expandable = false,
}: PerformancesProps) {
    const song = getFragmentData(STAFF_SONG, songFragment);
    const artist = getFragmentData(SONG_STAFF_ARTIST, artistFragment);
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

    const performancesShown = performances.slice(0, maxPerformances);
    const performancesHidden = performances.slice(maxPerformances);

    if (artist) {
        const performedAs = performances.find((performance) => performance.artist.id === artist.id);
        const performedWith = performances.filter((performance) => performance.artist.id !== artist.id);

        return (
            <>
                {performedAs?.as ? (
                    <Text variant="small" color="text-muted">
                        <span> as </span>
                        <span>
                            <StyledArtistLink as={Link} href={`/artist/${performedAs.artist.slug}`}>
                                {performedAs.as}
                            </StyledArtistLink>
                        </span>
                    </Text>
                ) : null}
                {performedWith.length ? (
                    <Text variant="small" color="text-muted">
                        <span> with </span>
                        <span>
                            {performedWith.map((performance) => (
                                <StyledArtist key={performance.artist.slug} $featuring={performance.role.toLowerCase().indexOf("feat") > -1}>
                                    <StyledArtistLink as={Link} href={`/artist/${performance.artist.slug}`}>
                                        {getDisplayedArtistName(performance)}
                                    </StyledArtistLink>
                                </StyledArtist>
                            ))}
                        </span>
                    </Text>
                ) : null}
            </>
        );
    }

    return (
        <Text color="text-muted">
            <Text variant="small"> by </Text>
            <Text>
                {performancesShown.map((performance) => (
                    <StyledArtist key={performance.artist.slug} $featuring={performance.role.toLowerCase().indexOf("feat") > -1}>
                        <Text as={Link} href={`/artist/${performance.artist.slug}`} link>
                            {getDisplayedArtistName(performance)}
                        </Text>
                    </StyledArtist>
                ))}
                {!!performancesHidden.length && (
                    <StyledArtist>
                        <Text link onClick={() => expandable && setExpandPerformances(true)}>
                            {performancesHidden.length} more
                        </Text>
                    </StyledArtist>
                )}
            </Text>
        </Text>
    );
}
