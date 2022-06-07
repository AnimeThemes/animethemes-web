import styled from "styled-components";
import { SummaryCard } from "components/card";
import { Text } from "components/text";
import useImage from "hooks/useImage";
import createVideoSlug from "utils/createVideoSlug";
import Link from "next/link";
import { SongTitleWithArtists } from "components/utils";
import { Column } from "components/box";
import { Icon } from "components/icon";
import { faAward, faSeedling, faUsers } from "@fortawesome/pro-solid-svg-icons";
import { CornerIcon } from "components/icon/CornerIcon";

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

export function BracketThemeSummaryCard({ contestant, isVoted, isWinner, seed, votes, ...props }) {
    const theme = contestant.theme;
    const { smallCover } = useImage(theme?.anime);

    let to = null;
    let description = contestant.source;

    if (theme) {
        const entry = theme.entries?.[0];
        const video = entry?.videos?.[0];
        const videoSlug = createVideoSlug(theme, entry, video);

        to = `/anime/${theme.anime.slug}/${videoSlug}`;

        description = (
            <SummaryCard.Description>
                <span>{theme.slug}</span>
                <Link href={`/anime/${theme.anime.slug}`} passHref prefetch={false}>
                    <Text as="a" link>{theme.anime.name}</Text>
                </Link>
            </SummaryCard.Description>
        );
    }

    return (
        <StyledSummaryCardWrapper {...props}>
            <StyledSummaryCard
                title={theme ? <SongTitleWithArtists song={theme.song} songTitleLinkTo={to}/> : contestant.name}
                description={description}
                image={smallCover}
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
