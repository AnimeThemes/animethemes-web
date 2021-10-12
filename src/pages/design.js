import { graphql, useStaticQuery } from "gatsby";
import { useContext, useEffect, useState } from "react";
import { Box, Flex, Grid } from "components/box";
import { Card, AnimeSummaryCard } from "components/card";
import { Text } from "components/text";
import { Button, VideoButton } from "components/button";
import { SearchInput } from "components/input";
import {
    faArrowRight, faChevronDown,
    faCompactDisc, faExclamationTriangle,
    faLightbulb, faMoon,
    faPlay,
    faRocket,
    faSpinner,
    faStar, faTag
} from "@fortawesome/free-solid-svg-icons";
import Prism from "prismjs";
import "styles/prism.scss";
import { Icon } from "components/icon";
import styled from "styled-components";
import theme from "theme";
import { Collapse, HeightTransition } from "components/utils";
import ColorThemeContext from "context/colorThemeContext";
import { ExternalLink } from "components/external-link";
import { Switcher } from "components/switcher";
import useSwitcher from "hooks/useSwitcher";
import useToggle from "hooks/useToggle";
import { Tag } from "components/tag";
import { CoverImage } from "components/image";
import { DescriptionList } from "components/description-list";
import { codeBlock } from "common-tags";
import { color } from "styled-system";
import { Listbox } from "components/listbox";

const ColorBox = styled(Box)`
    width: 3rem;
    height: 3rem;
    border: 2px solid ${theme.colors["primaryTitle"]};
    border-radius: 0.5rem;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
    
    ${color}
`;

export default function DesignPage() {
    const { colorTheme, toggleColorTheme } = useContext(ColorThemeContext);
    const [moreColors, setMoreColors] = useState(false);

    const colors = Object.keys(theme.colors);

    const [selectedItem, setSelectedItem] = useState("anime");
    const [season, setSeason] = useState(null);
    const [, entitySwitcher] = useSwitcher([ "anime", "themes", "artists" ], "anime");

    const [maxLines, toggleMaxLines] = useToggle(1, 0);
    const [collapse, toggleCollapse] = useToggle();

    const demoData = useStaticQuery(graphql`
        query {
            anime(slug: { eq: "bakemonogatari" }) {
                images {
                    facet
                    link
                }
                ...AnimeCard
                ...AnimeCardThemes
            }
        } 
    `);

    useEffect(() => {
        Prism.highlightAll();
    });

    return (
        <Box gapsColumn="3rem">
            <Text variant="h1">Design Documentation</Text>
            <Flex justifyContent="space-between" alignItems="center">
                <Text variant="h2">Color</Text>
                <Button silent gapsRow="0.5rem" onClick={toggleColorTheme}>
                    <Icon icon={colorTheme === null ? faSpinner : colorTheme === "dark" ? faLightbulb : faMoon} spin={colorTheme === null}/>
                    <span>Switch Theme</span>
                </Button>
            </Flex>
            <HeightTransition>
                <Grid gridTemplateColumns="repeat(auto-fit, minmax(20ch, 1fr))" gridGap="1rem" justifyContent="space-around">
                    {colors.slice(0, moreColors ? colors.length : Math.min(15, colors.length)).map((color) => (
                        <Color key={color} color={color}/>
                    ))}
                </Grid>
            </HeightTransition>
            <Flex justifyContent="flex-end">
                <Button silent gapsRow="0.5rem" onClick={() => setMoreColors((val) => !val)}>
                    <Icon icon={faChevronDown} rotation={moreColors ? 180 : undefined}/>
                    <span>{moreColors ? "Show less" : "Show more"}</span>
                </Button>
            </Flex>
            <Text variant="h2">Typography</Text>
            <Grid gridTemplateColumns="1fr 1fr" gridGap="2rem" alignItems="center" justifyItems="flex-start">
                <Text variant="code" className="language-jsx">{`<Text>This is normal text.</Text>`}</Text>
                <Text>This is normal text.</Text>

                <Flex gridColumn="1 / 3" gapsRow="0.5rem">
                    <Icon icon={faArrowRight} color="text-primary" />
                    <Text as="p" color="text-muted">Always wrap text in a <Text variant="code" className="language-jsx">{`<Text>`}</Text> component. This way basic styling is applied and default browser values get overridden.</Text>
                </Flex>

                <Text variant="code" className="language-jsx">{`<Text variant="h1">This is a page title.</Text>`}</Text>
                <Text variant="h1">This is a page title.</Text>

                <Text variant="code" className="language-jsx">{`<Text variant="h2">This is a section title.</Text>`}</Text>
                <Text variant="h2">This is a section title.</Text>

                <Text variant="code" className="language-jsx">{`<Text variant="small">This is small text.</Text>`}</Text>
                <Text variant="small">This is small text.</Text>

                <Text variant="code" className="language-jsx">{`<Text variant="code">This is code.</Text>`}</Text>
                <Text variant="code">This is code.</Text>

                <Flex gridColumn="1 / 3" gapsRow="0.5rem">
                    <Icon icon={faArrowRight} color="text-primary" />
                    <Text as="p" color="text-muted">Use the <Text variant="code">variant</Text> prop to apply pre-defined styles to your text.</Text>
                </Flex>

                <Text variant="code" className="language-jsx">{`<Text maxLines={1}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</Text>`}</Text>
                <Text maxLines={1}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</Text>

                <Text variant="code" className="language-jsx">{`<Text maxLines={3}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</Text>`}</Text>
                <Text maxLines={3}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</Text>

                <Flex gridColumn="1 / 3" gapsRow="0.5rem">
                    <Icon icon={faArrowRight} color="text-primary" />
                    <Text as="p" color="text-muted">Use the <Text variant="code">maxLines</Text> prop to add a limit to the number of lines a text should have. Overflowing text will get replaced with three dots (<Text variant="code">...</Text>)</Text>
                </Flex>

                <Text variant="code" className="language-jsx">{`<Text color="text">This is colored text.</Text>`}</Text>
                <Text color="text">This is colored text.</Text>

                <Text variant="code" className="language-jsx">{`<Text color="text-muted">This is colored text.</Text>`}</Text>
                <Text color="text-muted">This is colored text.</Text>

                <Text variant="code" className="language-jsx">{`<Text color="text-disabled">This is colored text.</Text>`}</Text>
                <Text color="text-disabled">This is colored text.</Text>

                <Text variant="code" className="language-jsx">{`<Text color="text-warning">This is colored text.</Text>`}</Text>
                <Text color="text-warning">This is colored text.</Text>

                <pre>
                    <Text variant="code" block className="language-jsx">
                        {codeBlock`
                            <ExternalLink href="https://reddit.com/r/AnimeThemes">
                                This is an external link.
                            </ExternalLink>
                        `}
                    </Text>
                </pre>
                <ExternalLink href="https://reddit.com/r/AnimeThemes">
                    This is an external link.
                </ExternalLink>
            </Grid>
            <Text variant="h2">Iconography</Text>
            <Grid gridTemplateColumns="1fr 1fr" gridGap="2rem" alignItems="center" justifyItems="flex-start">
                <Text variant="code" className="language-jsx">{`<Icon icon={faRocket}/>`}</Text>
                <Icon icon={faRocket}/>

                <Text variant="code" className="language-jsx">{`<Icon icon={faStar} color="text-primary"/>`}</Text>
                <Icon icon={faStar} color="text-primary"/>

                <Text variant="code" className="language-jsx">{`<Icon icon={faSpinner} spin/>`}</Text>
                <Icon icon={faSpinner} spin/>
            </Grid>
            <Text variant="h2">Tag</Text>
            <Grid gridTemplateColumns="1fr 1fr" gridGap="2rem" alignItems="center" justifyItems="flex-start">
                <Text variant="code" className="language-jsx">{`<Tag icon={faTag}>Tag</Tag>`}</Text>
                <Tag icon={faTag}>Tag</Tag>

                <pre>
                    <Text variant="code" block className="language-jsx">
                        {codeBlock`
                            <Tag icon={
                                <Icon icon={faExclamationTriangle} color="text-warning"/>
                            }>
                                <Text color="text-warning">Warning</Text>
                            </Tag>
                        `}
                    </Text>
                </pre>
                <Tag icon={
                    <Icon icon={faExclamationTriangle} color="text-warning"/>
                }>
                    <Text color="text-warning">Warning</Text>
                </Tag>
            </Grid>
            <Text variant="h2">Button</Text>
            <Grid gridTemplateColumns="1fr 1fr" gridGap="2rem" alignItems="center" justifyItems="flex-start">
                <Text variant="code" className="language-jsx">{`<Button>Button</Button>`}</Text>
                <Button>Button</Button>

                <Text variant="code" className="language-jsx">{`<Button variant="primary">Primary</Button>`}</Text>
                <Button variant="primary">Primary</Button>

                <Text variant="code" className="language-jsx">{`<Button silent>Silent</Button>`}</Text>
                <Button silent>Silent</Button>

                <pre>
                    <Text variant="code" block className="language-jsx">
                        {codeBlock`
                            <Button>
                                <Icon icon={faLightbulb}/>
                            </Button>
                        `}
                    </Text>
                </pre>
                <Button>
                    <Icon icon={faLightbulb}/>
                </Button>

                <pre>
                    <Text variant="code" block className="language-jsx">
                        {codeBlock`
                            <Button variant="primary">
                                <Icon icon={faLightbulb}/>
                            </Button>
                        `}
                    </Text>
                </pre>
                <Button variant="primary">
                    <Icon icon={faLightbulb}/>
                </Button>

                <pre>
                    <Text variant="code" block className="language-jsx">
                        {codeBlock`
                            <Button silent>
                                <Icon icon={faLightbulb}/>
                            </Button>
                        `}
                    </Text>
                </pre>
                <Button silent>
                    <Icon icon={faLightbulb}/>
                </Button>

                <pre>
                    <Text variant="code" block className="language-jsx">
                        {codeBlock`
                            <Button>
                                <Button as="span" variant="primary">
                                    <Icon icon={faPlay}/>
                                </Button>
                                Play
                            </Button>
                        `}
                    </Text>
                </pre>
                <Button>
                    <Button as="span" variant="primary">
                        <Icon icon={faPlay}/>
                    </Button>
                    Play
                </Button>

                <pre>
                    <Text variant="code" block className="language-jsx">
                        {codeBlock`
                            <Button>
                                <Button as="span" variant="primary">
                                    <Icon icon={faCompactDisc} spin/>
                                </Button>
                                Playing
                            </Button>
                        `}
                    </Text>
                </pre>
                <Button>
                    <Button as="span" variant="primary">
                        <Icon icon={faCompactDisc} spin/>
                    </Button>
                    Playing
                </Button>

                <pre>
                    <Text variant="code" block className="language-jsx">
                        {codeBlock`
                            <VideoButton
                                anime={{ slug: "bakemonogatari" }}
                                theme={{ slug: "OP1" }}
                                entry={{ version: "" }}
                                video={{
                                    resolution: 1080,
                                    nc: true,
                                    source: "BD",
                                    overlap: "None"
                                }}
                            />
                        `}
                    </Text>
                </pre>
                <VideoButton
                    anime={{ slug: "bakemonogatari" }}
                    theme={{ slug: "OP1" }}
                    entry={{ version: null }}
                    video={{
                        resolution: 1080,
                        nc: true,
                        source: "BD",
                        overlap: "None"
                    }}
                />
            </Grid>
            <Text variant="h2">Switcher</Text>
            <Grid gridTemplateColumns="1fr 1fr" gridGap="2rem" alignItems="center" justifyItems="flex-start">
                <pre>
                    <Text variant="code" block className="language-jsx">
                        {codeBlock`
                            // At the top of the component
                            const [selectedItem, setSelectedItem] = useState("anime");
                            
                            // Inside the render output
                            <Switcher
                                items={[ "anime", "themes", "artists" ]}
                                selectedItem={selectedItem}
                                onChange={setSelectedItem}
                            />
                        `}
                    </Text>
                </pre>
                <Switcher
                    items={[ "anime", "themes", "artists" ]}
                    selectedItem={selectedItem}
                    onChange={setSelectedItem}
                />
                <pre>
                    <Text variant="code" block className="language-jsx">
                        {codeBlock`
                            // At the top of the component
                            const [selectedEntity, entitySwitcher] = useSwitcher(
                                [ "anime", "themes", "artists" ], 
                                "anime"
                            );
                            
                            // Inside the render output
                            {entitySwitcher}
                        `}
                    </Text>
                </pre>
                {entitySwitcher}
            </Grid>
            <Text variant="h2">Card</Text>
            <Grid gridTemplateColumns="1fr 1fr" gridGap="2rem" alignItems="center" justifyItems="flex-start">
                <pre>
                    <Text variant="code" block className="language-jsx">
                        {codeBlock`
                            <Card>
                                <Text>This is text inside a card.</Text>
                            </Card>
                        `}
                    </Text>
                </pre>
                <Card>
                    <Text>This is text inside a card.</Text>
                </Card>

                <pre>
                    <Text variant="code" block className="language-jsx">
                        {codeBlock`
                            <Card hoverable>
                                <Text>This is a hoverable card.</Text>
                            </Card>
                        `}
                    </Text>
                </pre>
                <Card hoverable>
                    <Text>This is a hoverable card.</Text>
                </Card>

                <pre>
                    <Text variant="code" block className="language-jsx">
                        {codeBlock`
                            <StaticQuery query={graphql\`
                                query {
                                    anime(slug: { eq: "bakemonogatari" }) {
                                        ...AnimeCard
                                        ...AnimeCardThemes
                                    }
                                }    
                            \`}>
                                {(data) => (
                                    <AnimeSummaryCard
                                        anime={data.anime}
                                        maxThemes={1}
                                    />
                                )}
                            </StaticQuery>
                        `}
                    </Text>
                </pre>
                <AnimeSummaryCard
                    anime={demoData.anime}
                    maxThemes={1}
                />
            </Grid>
            <Text variant="h2">Input</Text>
            <Grid gridTemplateColumns="1fr 1fr" gridGap="2rem" alignItems="center" justifyItems="flex-start">
                <Text variant="code" className="language-jsx">
                    {`<SearchInput/>`}
                </Text>
                <SearchInput/>
            </Grid>
            <Text variant="h2">Image</Text>
            <Grid gridTemplateColumns="1fr 1fr" gridGap="2rem" alignItems="center" justifyItems="flex-start">
                <pre>
                    <Text variant="code" block className="language-jsx">
                        {codeBlock`
                            <StaticQuery query={graphql\`
                                query {
                                    anime(slug: { eq: "bakemonogatari" }) {
                                        images {
                                            facet
                                            link
                                        }
                                    }
                                }    
                            \`}>
                                {(data) => (
                                    <Box width="200px">
                                        <CoverImage resourceWithImages={data.anime}/>
                                    </Box>
                                )}
                            </StaticQuery>
                        `}
                    </Text>
                </pre>
                <Box width="200px">
                    <CoverImage resourceWithImages={demoData.anime}/>
                </Box>
            </Grid>
            <Text variant="h2">Description List</Text>
            <Grid gridTemplateColumns="1fr 1fr" gridGap="2rem" alignItems="center" justifyItems="flex-start">
                <pre>
                    <Text variant="code" block className="language-jsx">
                        {codeBlock`
                            <DescriptionList>
                                <DescriptionList.Item title="Topic">
                                    Description
                                </DescriptionList.Item>
                                <DescriptionList.Item title="Another Topic">
                                    <ExternalLink href="https://reddit.com/r/AnimeThemes">
                                        Link
                                    </ExternalLink>
                                </DescriptionList.Item>
                            </DescriptionList>
                        `}
                    </Text>
                </pre>
                <DescriptionList>
                    <DescriptionList.Item title="Topic">
                        Description
                    </DescriptionList.Item>
                    <DescriptionList.Item title="Another Topic">
                        <ExternalLink href="https://reddit.com/r/AnimeThemes">
                            Link
                        </ExternalLink>
                    </DescriptionList.Item>
                </DescriptionList>
            </Grid>
            <Text variant="h2">Experimental</Text>
            <Grid gridTemplateColumns="1fr 1fr" gridGap="2rem" alignItems="center" justifyItems="flex-start">
                <pre>
                    <Text variant="code" block className="language-jsx">
                        {codeBlock`
                            // At the top of the component
                            const [season, setSeason] = useState(null);
                            
                            // Inside the render output
                            <Listbox
                                options={[
                                    null,
                                    "Winter",
                                    "Spring",
                                    "Summer",
                                    "Fall"
                                ]}
                                selectedValue={season}
                                onSelect={setSeason}
                                nullValue="Any"
                                resettable
                                width="150px"
                            />
                        `}
                    </Text>
                </pre>
                <Listbox
                    options={[
                        null,
                        "Winter",
                        "Spring",
                        "Summer",
                        "Fall"
                    ]}
                    selectedValue={season}
                    onSelect={setSeason}
                    nullValue="Any"
                    resettable
                    width="150px"
                />
            </Grid>
            <Text variant="h2">Utils</Text>
            <Grid gridTemplateColumns="1fr 1fr" gridGap="2rem" alignItems="center" justifyItems="flex-start">
                <pre>
                    <Text variant="code" block className="language-jsx">
                        {codeBlock`
                            // At the top of the component
                            const [maxLines, toggleMaxLines] = useToggle(1, 0);
                            
                            // Inside the render output
                            <Card gapsColumn="1rem">
                                <HeightTransition>
                                    <Text maxLines={maxLines}>
                                        Lorem ipsum dolor sit amet ...
                                    </Text>
                                </HeightTransition>
                                <Button
                                    variant="on-card"
                                    onClick={toggleMaxLines}
                                >
                                    Toggle text length
                                </Button>
                            </Card>
                        `}
                    </Text>
                </pre>
                <Card gapsColumn="1rem">
                    <HeightTransition>
                        <Text maxLines={maxLines}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                        </Text>
                    </HeightTransition>
                    <Button variant="on-card" onClick={toggleMaxLines}>
                        Toggle text length
                    </Button>
                </Card>
                <pre>
                    <Text variant="code" block className="language-jsx">
                        {codeBlock`
                            // At the top of the component
                            const [collapse, toggleCollapse] = useToggle();
                            
                            // Inside the render output
                            <Card gapsColumn="1rem">
                                <Collapse collapse={collapse}>
                                    <Text>
                                        Lorem ipsum dolor sit amet ...
                                    </Text>
                                </Collapse>
                                <Button variant="on-card" onClick={toggleCollapse}>
                                    Toggle collapse
                                </Button>
                            </Card>
                        `}
                    </Text>
                </pre>
                <Card gapsColumn="1rem">
                    <Collapse collapse={collapse}>
                        <Text>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                        </Text>
                    </Collapse>
                    <Button variant="on-card" onClick={toggleCollapse}>
                        Toggle collapse
                    </Button>
                </Card>
            </Grid>
        </Box>
    );
}

function Color({ color }) {
    return (
        <Flex flexDirection="column" alignItems="center" gapsColumn="0.5rem">
            <ColorBox bg={color}/>
            <Text variant="code">{color}</Text>
        </Flex>
    );
}
