import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

import { uniqBy } from "lodash-es";

import { Text } from "@/components/text/Text";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

const StyledArtist = styled(Text)`
    &:not(:first-of-type)::before {
        content: ", ";
        font-size: 0.8rem;
        font-weight: 700;
    }

    &:not(:first-of-type):last-of-type::before {
        content: " & ";
    }
`;

const StyledArtistLink = styled(Text).attrs({ as: "a", link: true })`
    font-size: 1rem;
`;

export const PERFORMANCES_SONG = graphql(`
    fragment PerformancesSong on Song {
        performances {
            alias
            as
            relevance
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

export const PERFORMANCES_ARTIST = graphql(`
    fragment PerformancesArtist on Artist {
        id
    }
`);

export interface PerformancesProps {
    song: FragmentType<typeof PERFORMANCES_SONG> | null;
    artist?: FragmentType<typeof PERFORMANCES_ARTIST>;
    maxPerformances?: number | null;
    expandable?: boolean;
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
    const song = getFragmentData(PERFORMANCES_SONG, songFragment);
    const artist = getFragmentData(PERFORMANCES_ARTIST, artistFragment);
    const [expandPerformances, setExpandPerformances] = useState(false);

    if (!song?.performances.length) {
        return null;
    }

    if (maxPerformances === null || expandPerformances) {
        maxPerformances = song.performances.length;
    }

    const performances = uniqBy(song.performances, (performance) => performance.artist.id).sort(
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
                                <StyledArtist key={performance.artist.slug}>
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
                    <StyledArtist key={performance.artist.slug}>
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
