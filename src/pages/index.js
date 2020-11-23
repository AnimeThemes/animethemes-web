import {graphql, Link} from "gatsby";
import Title from "components/text/title";
import Text from "components/text";
import styled from "styled-components";
import {gapsColumn} from "styles/mixins";
import Card from "components/card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDesktop, faInfo, faMobileAlt} from "@fortawesome/free-solid-svg-icons";
import Flex from "components/flex";
import Tag from "components/tag";
import {useMedia} from "react-media";

const StyledIndexPage = styled.div`
    ${gapsColumn("1.5rem")}
`;
const StyledPageGrid = styled.div`
    display: grid;
    grid-template-columns: auto 1fr auto auto;
    grid-gap: 1rem;
    align-items: center;
  
    @media (max-width: 720px) {
        grid-template-columns: 1fr;
    }
`;
const StyledAnnouncement = styled(Text)`
    & a {
        color: ${(props) => props.theme.colors.secondaryTitle};
      
        &:hover {
            text-decoration: underline;
        }
    }
`;

export default function IndexPage({ data: { allAnnouncement } }) {
    return (
        <StyledIndexPage>
            <Title>Welcome, to AnimeThemes.moe!</Title>
            <Text as="p">
                <span>This page is still activily being worked on. If you are a developer and interested in contributing feel free to contact us on </span>
                <Text as="a" link href="https://discordapp.com/invite/m9zbVyQ">Discord</Text>
                <span>.</span>
            </Text>
            <Text as="p">
                <span>The source code for this page can be found </span>
                <Text as="a" link href="https://github.com/AnimeThemes/animethemes-web">here</Text>
                <span> and our other open source projects can be found in our </span>
                <Text as="a" link href="https://github.com/AnimeThemes">GitHub organization</Text>
                <span>.</span>
            </Text>
            {allAnnouncement.totalCount && (
                <>
                    <Title variant="section">Announcements</Title>
                    <Text as="p">These are for demo purposes only. The content may not be accurate.</Text>
                    {allAnnouncement.nodes.map((announcement) => (
                        <Card key={announcement.id}>
                            <Flex row gapsRow="1rem">
                                <Text link>
                                    <FontAwesomeIcon icon={faInfo}/>
                                </Text>
                                <StyledAnnouncement dangerouslySetInnerHTML={{__html: announcement.content}}/>
                            </Flex>
                        </Card>
                    ))}
                </>
            )}
            <Title variant="section">Pages</Title>
            <StyledPageGrid>
                <PageGridItem
                    path="/search"
                    description="Search the AnimeThemes database. You can also use the search bar in the navigation."
                    desktop
                    mobile
                />
                <PageGridItem
                    path="/year"
                    description="Browse all years present in the database."
                    desktop
                    mobile
                />
                <PageGridItem
                    path="/year/2009"
                    description="Browse all seasons of a specific year."
                    desktop
                    mobile
                />
                <PageGridItem
                    path="/year/2009/summer"
                    description="Browse all anime of a specific season."
                    desktop
                    mobile
                />
                <PageGridItem
                    path="/anime/bakemonogatari"
                    description="Browse all themes of a specific anime."
                    desktop
                    mobile
                />
                <PageGridItem
                    path="/series/monogatari"
                    description="Browse all anime which belong to the same series."
                    desktop
                    mobile
                />
                <PageGridItem
                    path="/artist/kana_hanazawa"
                    description="Browse all songs an artist has performed."
                    desktop
                    mobile
                />
                <PageGridItem
                    path="/video/Bakemonogatari-OP1"
                    description="Watch themes."
                    desktop
                />
            </StyledPageGrid>
            {!!process.env.GATSBY_CI && (
                <>
                    <Title variant="section">GitHub Pages</Title>
                    <Text as="p">
                        <span>You are browsing this site on GitHub Pages. On every commit in the </span>
                        <Text as="a" code link href="https://github.com/AnimeThemes/animethemes-web">animethemes-web</Text>
                        <span> repository this site gets updated. This also comes with some limitations like </span>
                        <Text code>.htaccess</Text>
                        <span> files not working. So don't expect everything on this site to work the same way as on the production site.</span>
                    </Text>
                </>
            )}
        </StyledIndexPage>
    );
}

function PageGridItem({ path, description, desktop, mobile, children }) {
    const isMobile = useMedia({ query: "(max-width: 720px)" });

    return (
        <>
            <Link to={path}>
                <Text code link>{path}</Text>
            </Link>
            <Text>{description || children}</Text>
            {desktop ? (
                <Tag icon={faDesktop} title="Compatible with desktop devices">
                    {isMobile && "Compatible with desktop devices"}
                </Tag>
            ) : <span/>}
            {mobile ? (
                <Tag icon={faMobileAlt} title="Compatible with mobile devices">
                    {isMobile && "Compatible with mobile devices"}
                </Tag>
            ) : <span/>}
        </>
    );
}

export const query = graphql`
    query IndexPageQuery {
        allAnnouncement {
            nodes {
                content
            }
            totalCount
        }
    }
`;
