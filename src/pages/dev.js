import React from "react";
import Link from "next/link";
import { Text } from "components/text";
import styled from "styled-components";
import { Column } from "components/box";
import { ExternalLink } from "components/external-link";
import theme from "theme";

const StyledLink = styled.a`
    max-width: 100%;
`;

export default function DevelopmentPage() {
    return (
        <>
            <Text variant="h1">Development Hub</Text>
            <Text as="p">
                <span>This page is still actively being worked on. If you are a developer and interested in contributing feel free to contact us on </span>
                <ExternalLink href="https://discordapp.com/invite/m9zbVyQ">Discord</ExternalLink>
                <span>.</span>
            </Text>
            <Text as="p">
                <span>The source code for this page can be found on </span>
                <ExternalLink href="https://github.com/AnimeThemes/animethemes-web">GitHub</ExternalLink>
                <span>. For our other open source projects we also have a </span>
                <ExternalLink href="https://github.com/AnimeThemes">GitHub organization</ExternalLink>
                <span>.</span>
            </Text>
            <Text variant="h2">Pages</Text>
            <Column style={{ "--gap": "24px" }}>
                <PageGridItem
                    path="/"
                    description="The home page of AnimeThemes."
                />
                <PageGridItem
                    path="/dev"
                    description="This page!"
                />
                <PageGridItem
                    path="/design"
                    description="A page listing various design components."
                />
                <PageGridItem
                    path="/profile"
                    description={(
                        <Text>
                            <TagNew>NEW: </TagNew>
                            A personal profile page listing own playlists and recently watched themes.
                        </Text>
                    )}
                    otherPaths={{
                        "/profile/playlist": "Experimental. Currently a local playlist saved to the browser's storage."
                    }}
                />
                <PageGridItem
                    path="/search"
                    description="Search the AnimeThemes database."
                    otherPaths={{
                        "/search/anime": "Search only for anime or explore the list of all anime.",
                        "/search/theme": "Search only for themes or explore the list of all themes.",
                        "/search/artist": "Search only for artists or explore the list of all artists.",
                        "/search/series": "Search only for series or explore the list of all series.",
                        "/search/studio": "Search only for studios or explore the list of all studios.",
                    }}
                />
                <PageGridItem
                    path="/year"
                    description="Browse all years present in the database."
                />
                <PageGridItem
                    path="/year/2009"
                    description="Browse all seasons of a specific year."
                    otherPaths={{
                        "/year/1963": "Every year has a page, even 60s, 70s, etc."
                    }}
                />
                <PageGridItem
                    path="/year/2009/summer"
                    description="Browse all anime of a specific season."
                />
                <PageGridItem
                    path="/series/monogatari"
                    description="Browse all anime which belong to the same series."
                    otherPaths={{
                        "/series/precure": "A lot of anime.",
                        "/series/clannad": "Only three anime.",
                        "/series/fma": "Only two anime."
                    }}
                />
                <PageGridItem
                    path="/studio/kyoto_animation"
                    description="Browse all anime which were produced by the same studio."
                />
                <PageGridItem
                    path="/artist/kana_hanazawa"
                    description="Browse all songs an artist has performed."
                    otherPaths={{
                        "/artist/vickeblanka": "Very few songs."
                    }}
                />
                <PageGridItem
                    path="/anime/bakemonogatari"
                    description="Browse all themes of a specific anime."
                    otherPaths={{
                        "/anime/etotama": "Many themes with a lot of artists.",
                        "/anime/gintama": "Theme groups with many themes.",
                        "/anime/bleach": "Many themes and many variants.",
                        "/anime/tales_of_phantasia_the_animation": "Many sources.",
                        "/anime/isekai_quartet": "Multiple series."
                    }}
                />
                <PageGridItem
                    path="/anime/bakemonogatari/OP1-NCBD1080"
                    description="Watch themes."
                    otherPaths={{
                        "/anime/uma_musume_pretty_derby/ED5": "Many artists.",
                        "/anime/girls_und_panzer/ED-NCBD1080": "Many alternative versions.",
                        "/anime/fatekaleid_liner_prismaillya_2wei_herz/OP": "Many alternative sources.",
                        "/anime/shingeki_no_kyojin/ED1-NCBD1080": "Same video for two entries.",
                        "/anime/shingeki_no_kyojin_ova/ED1-NCBD1080": "See above."
                    }}
                />
                <PageGridItem
                    path="/anime"
                    description={(
                        <Text>
                            <TagNew/>
                            An index of all anime in the database.
                        </Text>
                    )}
                    otherPaths={{
                        "/artist": "An index of all artists in the database.",
                        "/series": "An index of all series in the database.",
                        "/studio": "An index of all studios in the database."
                    }}
                />
                <PageGridItem
                    path="/event"
                    description={(
                        <Text>
                            <TagNew/>
                            Explore themes featured in awards or brackets.
                        </Text>
                    )}
                    otherPaths={{
                        "/event/anime-awards": "Page for the annual /r/anime Awards.",
                        "/event/best-anime-opening-ix-salty-arrow": "Page for an anime opening bracket hosted on AnimeBracket."
                    }}
                />
            </Column>
        </>
    );
}

const StyledPageGridItem = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) 1fr;
    justify-items: flex-start;
    align-items: center;
    grid-gap: 8px 16px;
    
    @media (max-width: ${theme.breakpoints.mobileMax}) {
        grid-template-columns: minmax(0, 1fr);
    }
`;

function PageGridItem({ path, otherPaths = {}, description }) {
    return (
        <StyledPageGridItem>
            <PageLink path={path}/>
            <Text>{description}</Text>
            {Object.entries(otherPaths).map(([path, description]) => (
                <React.Fragment key={path}>
                    <PageLink path={path}/>
                    <Text color="text-muted">{description}</Text>
                </React.Fragment>
            ))}
        </StyledPageGridItem>
    );
}

function PageLink({ path }) {
    return (
        <Link key={path} href={path} passHref prefetch={false}>
            <StyledLink to={path}>
                <Text variant="code" link maxLines={1}>{path}</Text>
            </StyledLink>
        </Link>
    );
}

const StyledTagNew = styled(Text).attrs({ variant: "small", color: "text-primary" })`
    letter-spacing: 0.1rem;
`;

function TagNew() {
    return (
        <StyledTagNew>NEW: </StyledTagNew>
    );
}
