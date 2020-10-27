import {Link} from "gatsby";
import Title from "components/text/title";
import Text from "components/text";
import styled from "styled-components";
import {gapsColumn} from "styles/mixins";

const StyledIndexPage = styled.div`
    ${gapsColumn("1.5rem")}
`;
const StyledPageGrid = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 1rem;
    align-items: center;
`;

export default function IndexPage() {
    return (
        <StyledIndexPage>
            <Title>Welcome, to AnimeThemes.moe!</Title>
            <Text as="p">
                <span>This page is still activily being worked on. If you are a developer and interested in contributing feel free to contact us on </span>
                <Text link href="https://discordapp.com/invite/m9zbVyQ">Discord</Text>
                <span>.</span>
            </Text>
            <Text as="p">
                <span>The source code for this page can be found </span>
                <Text link href="https://github.com/AnimeThemes/animethemes-web">here</Text>
                <span> and our other open source projects can be found in our </span>
                <Text link href="https://github.com/AnimeThemes">GitHub organization</Text>
                <span>.</span>
            </Text>
            <Title variant="section">Pages</Title>
            <StyledPageGrid>
                <PageGridItem path="/search" description="Search the AnimeThemes database. You can also use the search bar in the navigation."/>
                <PageGridItem path="/year" description="Browse all years present in the database."/>
                <PageGridItem path="/year/2009" description="Browse all seasons of a specific year."/>
                <PageGridItem path="/year/2009/summer" description="Browse all anime of a specific season."/>
                <PageGridItem path="/anime/bakemonogatari" description="Browse all themes of a specific anime."/>
                <PageGridItem path="/video/Bakemonogatari-OP1" description="Watch themes. Still work in progress."/>
            </StyledPageGrid>
            {!!process.env.GATSBY_CI && (
                <>
                    <Title variant="section">GitHub Pages</Title>
                    <Text as="p">
                        <span>You are browsing this site on GitHub Pages. On every commit in the </span>
                        <Text code link href="https://github.com/AnimeThemes/animethemes-web">animethemes-web</Text>
                        <span> repository this site gets updated. This also comes with some limitations like </span>
                        <Text code>.htaccess</Text>
                        <span> files not working. So don't expect everything on this site to work the same way as the production site.</span>
                    </Text>
                </>
            )}
        </StyledIndexPage>
    );
}

function PageGridItem({ path, description, children }) {
    return (
          <>
             <Link to={path}>
                <Text code link>{path}</Text>
            </Link>
            <Text>{description || children}</Text>
          </>
    );
}
