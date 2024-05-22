import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styled from "styled-components";

import { faAward, faSeedling, faUsers } from "@fortawesome/pro-solid-svg-icons";
import gql from "graphql-tag";

import { Column } from "@/components/box/Flex";
import { SummaryCard } from "@/components/card/SummaryCard";
import { ThemeSummaryCard } from "@/components/card/ThemeSummaryCard";
import { CornerIcon } from "@/components/icon/CornerIcon";
import { Icon } from "@/components/icon/Icon";
import { Text } from "@/components/text/Text";
import { TextLink } from "@/components/text/TextLink";
import { SongTitleWithArtists } from "@/components/utils/SongTitleWithArtists";
import type { BracketThemeSummaryCardConstestantFragment } from "@/generated/graphql";
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

interface BracketThemeSummaryCardProps extends ComponentPropsWithoutRef<typeof StyledSummaryCardWrapper> {
    contestant: BracketThemeSummaryCardConstestantFragment
    isVoted: boolean
    isWinner: boolean
    seed: number | null
    votes: number | null
}

export function BracketThemeSummaryCard({ contestant, isVoted, isWinner, seed, votes, ...props }: BracketThemeSummaryCardProps) {
    const theme = contestant.theme;
    const { smallCover } = extractImages(theme?.anime);

    let to;
    let description: ReactNode = contestant.source;

    if (theme?.anime) {
        const entry = theme.entries?.[0];
        const video = entry?.videos?.[0];
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
                title={theme ? <SongTitleWithArtists song={theme.song} songTitleLinkTo={to}/> : contestant.name}
                description={description}
                image={smallCover ?? contestant.image}
                to={to}
                style={{ "--opacity": !isVoted || isWinner ? 1 : 0.5 }}
            >
                <Column style={{ "--gap": "8px" }}>
                    <Text variant="small" color="text-muted" noWrap title="Seed">
                        <Icon icon={faSeedling}/>
                        <StyledRank> {seed}</StyledRank>
                    </Text>
                    {isVoted && (
                        <Text variant="small" color={isWinner ? "text-primary" : "text-muted"} noWrap title="Votes">
                            <Icon icon={faUsers}/>
                            <StyledRank> {votes}</StyledRank>
                        </Text>
                    )}
                </Column>

            </StyledSummaryCard>
            {isWinner && (
                <CornerIcon icon={faAward} title="Winner"/>
            )}
        </StyledSummaryCardWrapper>
    );
}

BracketThemeSummaryCard.fragments = {
    contestant: gql`
        ${ThemeSummaryCard.fragments.theme}
        
        fragment BracketThemeSummaryCardConstestant on BracketCharacter {
            name
            source
            image
            theme {
                ...ThemeSummaryCardTheme
            }
        }
    `,
};
