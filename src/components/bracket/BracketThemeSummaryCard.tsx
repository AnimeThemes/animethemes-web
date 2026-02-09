import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styled from "styled-components";

import { faAward, faSeedling, faUsers } from "@fortawesome/free-solid-svg-icons";

import { Column } from "@/components/box/Flex";
import { SummaryCard } from "@/components/card/SummaryCard";
import { CornerIcon } from "@/components/icon/CornerIcon";
import { Icon } from "@/components/icon/Icon";
import { Text } from "@/components/text/Text";
import { TextLink } from "@/components/text/TextLink";
import { SongTitleWithArtists } from "@/components/utils/SongTitleWithArtists";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";
import type { Bracket, BracketCharacter, BracketPairing, BracketRound } from "@/lib/server/animebracket";
import createVideoSlug from "@/utils/createVideoSlug";
import extractImages from "@/utils/extractImages";

const StyledSummaryCardWrapper = styled.div`
    position: relative;

    justify-self: stretch;
`;

const StyledSummaryCard = styled(SummaryCard)`
    padding-inline-end: 24px;

    opacity: var(--opacity);
`;

const StyledRank = styled(Text)`
    font-variant-numeric: tabular-nums;
    letter-spacing: 1px;
`;

const fragments = {
    theme: graphql(`
        fragment BracketThemeSummaryCardTheme on AnimeTheme {
            ...createVideoSlugTheme
            ...ThemeMenuTheme
            type
            sequence
            group {
                name
                slug
            }
            anime {
                slug
                name
                images {
                    nodes {
                        ...extractImagesImage
                    }
                }
            }
            song {
                ...SongTitleWithArtistsSong
            }
            animethemeentries {
                ...createVideoSlugEntry
                videos {
                    nodes {
                        ...createVideoSlugVideo
                    }
                }
            }
        }
    `),
};

export interface BracketWithThemes extends Bracket {
    currentRound: BracketRoundWithThemes | null;
    rounds: Array<BracketRoundWithThemes>;
}
export interface BracketRoundWithThemes extends BracketRound {
    pairings: Array<BracketPairingWithThemes>;
}
export interface BracketPairingWithThemes extends BracketPairing {
    characterA: BracketCharacterWithTheme;
    characterB: BracketCharacterWithTheme;
}
export interface BracketCharacterWithTheme extends BracketCharacter {
    theme: FragmentType<typeof fragments.theme> | null;
}

interface BracketThemeSummaryCardProps extends ComponentPropsWithoutRef<typeof StyledSummaryCardWrapper> {
    character: BracketCharacterWithTheme;
    isVoted: boolean;
    isWinner: boolean;
    seed: number | null;
    votes: number | null;
}

export function BracketThemeSummaryCard({
    character,
    isVoted,
    isWinner,
    seed,
    votes,
    ...props
}: BracketThemeSummaryCardProps) {
    const theme = getFragmentData(fragments.theme, character.theme);
    const { smallCover } = extractImages(theme?.anime.images.nodes ?? []);

    let to;
    let description: ReactNode = character.source;

    if (theme?.anime) {
        const entry = theme.animethemeentries?.[0];
        const video = entry?.videos.nodes[0];
        const videoSlug = createVideoSlug(theme, entry, video);

        to = `/anime/${theme.anime.slug}/${videoSlug}`;

        description = (
            <SummaryCard.Description>
                <span>{theme.type + (theme.sequence || "")}</span>
                <TextLink href={`/anime/${theme.anime.slug}`}>{theme.anime.name}</TextLink>
            </SummaryCard.Description>
        );
    }

    return (
        <StyledSummaryCardWrapper {...props}>
            <StyledSummaryCard
                title={theme ? <SongTitleWithArtists song={theme.song} songTitleLinkTo={to} /> : character.name}
                description={description}
                image={smallCover ?? character.image}
                to={to}
                style={{ "--opacity": !isVoted || isWinner ? 1 : 0.5 }}
            >
                <Column style={{ "--gap": "8px" }}>
                    <Text variant="small" color="text-muted" noWrap title="Seed">
                        <Icon icon={faSeedling} />
                        <StyledRank> {seed}</StyledRank>
                    </Text>
                    {isVoted && (
                        <Text variant="small" color={isWinner ? "text-primary" : "text-muted"} noWrap title="Votes">
                            <Icon icon={faUsers} />
                            <StyledRank> {votes}</StyledRank>
                        </Text>
                    )}
                </Column>
            </StyledSummaryCard>
            {isWinner && <CornerIcon icon={faAward} title="Winner" />}
        </StyledSummaryCardWrapper>
    );
}
