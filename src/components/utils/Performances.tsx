import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

import type { Maybe } from "@graphql-tools/utils";

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

const fragments = {
    song: graphql(`
        fragment PerformancesSong on Song {
            performances {
                alias
                as
                artist {
                    __typename
                    ... on Artist {
                        slug
                        name
                    }
                    ... on Membership {
                        group {
                            slug
                            name
                        }
                    }
                }
            }
        }
    `),
    artist: graphql(`
        fragment PerformancesArtist on Artist {
            slug
        }
    `),
};

export interface PerformancesProps {
    song: FragmentType<typeof fragments.song> | null;
    artist?: FragmentType<typeof fragments.artist>;
    maxPerformances?: number | null;
    expandable?: boolean;
}

interface ArtistNameProps {
    alias: Maybe<string>;
    as: Maybe<string>;
    artist: {
        name: string;
        slug: string;
    };
}

export function getDisplayedArtistName({ alias, artist, as }: ArtistNameProps) {
    const artistName = alias ?? artist.name;

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
    const song = getFragmentData(fragments.song, songFragment);
    const artist = getFragmentData(fragments.artist, artistFragment);
    const [expandPerformances, setExpandPerformances] = useState(false);

    if (!song?.performances.length) {
        return null;
    }

    if (maxPerformances === null || expandPerformances) {
        maxPerformances = song.performances.length;
    }

    const performances = [...song.performances]
        .map((performance) => ({
            ...performance,
            artist: performance.artist.__typename === "Artist" ? performance.artist : performance.artist.group,
        }))
        .sort((a, b) => a.artist.name.localeCompare(b.artist.name));
    const performancesShown = performances.slice(0, maxPerformances);
    const performancesHidden = performances.slice(maxPerformances);

    if (artist) {
        const performedAs = performances.find((performance) => performance.artist.slug === artist.slug);
        const performedWith = performances.filter((performance) => performance.artist.slug !== artist.slug);

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
