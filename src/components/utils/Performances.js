import Link from "next/link";
import { Text } from "components/text";
import styled from "styled-components";
import { useState } from "react";

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

export function Performances({ song, artist, maxPerformances = 3 }) {
    const [expandPerformances, setExpandPerformances] = useState(false);

    if (!song?.performances?.length) {
        return null;
    }

    if (maxPerformances === null || expandPerformances) {
        maxPerformances = song.performances.length;
    }

    const performances = song.performances.sort((a, b) => a.artist.name.localeCompare(b.artist.name));
    const performancesShown = performances.slice(0, maxPerformances);
    const performancesHidden = performances.slice(maxPerformances);

    if (artist) {
        const performedAs = performances.find((performance) => performance.artist.slug === artist.slug);
        const performedWith = performances.filter((performance) => performance.artist.slug !== artist.slug);

        return (
            <>
                {!!performedAs.as && (
                    <Text variant="small" color="text-muted">
                        <span> as </span>
                        <span>
                            <Link href={`/artist/${performedAs.artist.slug}`} passHref prefetch={false}>
                                <StyledArtistLink>
                                    {performedAs.as}
                                </StyledArtistLink>
                            </Link>
                        </span>
                    </Text>
                )}
                {!!performedWith.length && (
                    <Text variant="small" color="text-muted">
                        <span> with </span>
                        <span>
                            {performedWith.map((performance) => (
                                <StyledArtist key={performance.artist.slug}>
                                    <Link href={`/artist/${performance.artist.slug}`} passHref prefetch={false}>
                                        <StyledArtistLink>
                                            {performance.as ? `${performance.as} (CV: ${performance.artist.name})` : performance.artist.name}
                                        </StyledArtistLink>
                                    </Link>
                                </StyledArtist>
                            ))}
                        </span>
                    </Text>
                )}
            </>
        );
    }

    return (
        <Text color="text-muted">
            <Text variant="small"> by </Text>
            <Text>
                {performancesShown.map((performance) => (
                    <StyledArtist key={performance.artist.slug}>
                        <Link href={`/artist/${performance.artist.slug}`} passHref prefetch={false}>
                            <Text as="a" link>
                                {performance.as ? `${performance.as} (CV: ${performance.artist.name})` : performance.artist.name}
                            </Text>
                        </Link>
                    </StyledArtist>
                ))}
                {!!performancesHidden.length && (
                    <StyledArtist>
                        <Text link onClick={() => setExpandPerformances(true)}>
                            {performancesHidden.length} more
                        </Text>
                    </StyledArtist>
                )}
            </Text>
        </Text>
    );
}
