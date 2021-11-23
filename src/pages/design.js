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
import { fetchData } from "lib/server";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";

const ColorBox = styled(Box)`
    width: 3rem;
    height: 3rem;
    border: 2px solid ${theme.colors["primaryTitle"]};
    border-radius: 0.5rem;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
    
    ${color}
`;

export default function DesignPage({ demoData }) {
    const { colorTheme, toggleColorTheme } = useContext(ColorThemeContext);
    const [moreColors, setMoreColors] = useState(false);

    const colors = Object.keys(theme.colors);

    const [selectedItem, setSelectedItem] = useState("anime");
    const [season, setSeason] = useState(null);
    const [, entitySwitcher] = useSwitcher([ "anime", "themes", "artists" ], "anime");

    const [maxLines, toggleMaxLines] = useToggle(1, 0);
    const [collapse, toggleCollapse] = useToggle();

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
                <Highlight>{`<Text>This is normal text.</Text>`}</Highlight>
                <Text>This is normal text.</Text>

                <Flex gridColumn="1 / 3" gapsRow="0.5rem">
                    <Icon icon={faArrowRight} color="text-primary" />
                    <Text as="p" color="text-muted">Always wrap text in a <Highlight>{`<Text>`}</Highlight> component. This way basic styling is applied and default browser values get overridden.</Text>
                </Flex>

                <Highlight>{`<Text variant="h1">This is a page title.</Text>`}</Highlight>
                <Text variant="h1">This is a page title.</Text>

                <Highlight>{`<Text variant="h2">This is a section title.</Text>`}</Highlight>
                <Text variant="h2">This is a section title.</Text>

                <Highlight>{`<Text variant="small">This is small text.</Text>`}</Highlight>
                <Text variant="small">This is small text.</Text>

                <Highlight>{`<Text variant="code">This is code.</Text>`}</Highlight>
                <Text variant="code">This is code.</Text>

                <Flex gridColumn="1 / 3" gapsRow="0.5rem">
                    <Icon icon={faArrowRight} color="text-primary" />
                    <Text as="p" color="text-muted">Use the <Text variant="code">variant</Text> prop to apply pre-defined styles to your text.</Text>
                </Flex>

                <Highlight>{`<Text maxLines={1}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</Text>`}</Highlight>
                <Text maxLines={1}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</Text>

                <Highlight>{`<Text maxLines={3}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</Text>`}</Highlight>
                <Text maxLines={3}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</Text>

                <Flex gridColumn="1 / 3" gapsRow="0.5rem">
                    <Icon icon={faArrowRight} color="text-primary" />
                    <Text as="p" color="text-muted">Use the <Text variant="code">maxLines</Text> prop to add a limit to the number of lines a text should have. Overflowing text will get replaced with three dots (<Text variant="code">...</Text>)</Text>
                </Flex>

                <Highlight>{`<Text color="text">This is colored text.</Text>`}</Highlight>
                <Text color="text">This is colored text.</Text>

                <Highlight>{`<Text color="text-muted">This is colored text.</Text>`}</Highlight>
                <Text color="text-muted">This is colored text.</Text>

                <Highlight>{`<Text color="text-disabled">This is colored text.</Text>`}</Highlight>
                <Text color="text-disabled">This is colored text.</Text>

                <Highlight>{`<Text color="text-warning">This is colored text.</Text>`}</Highlight>
                <Text color="text-warning">This is colored text.</Text>

                <pre>
                    <Highlight block>
                        {codeBlock`
                            <ExternalLink href="https://reddit.com/r/AnimeThemes">
                                This is an external link.
                            </ExternalLink>
                        `}
                    </Highlight>
                </pre>
                <ExternalLink href="https://reddit.com/r/AnimeThemes">
                    This is an external link.
                </ExternalLink>
            </Grid>
            <Text variant="h2">Iconography</Text>
            <Grid gridTemplateColumns="1fr 1fr" gridGap="2rem" alignItems="center" justifyItems="flex-start">
                <Highlight>{`<Icon icon={faRocket}/>`}</Highlight>
                <Icon icon={faRocket}/>

                <Highlight>{`<Icon icon={faStar} color="text-primary"/>`}</Highlight>
                <Icon icon={faStar} color="text-primary"/>

                <Highlight>{`<Icon icon={faSpinner} spin/>`}</Highlight>
                <Icon icon={faSpinner} spin/>
            </Grid>
            <Text variant="h2">Tag</Text>
            <Grid gridTemplateColumns="1fr 1fr" gridGap="2rem" alignItems="center" justifyItems="flex-start">
                <Highlight>{`<Tag icon={faTag}>Tag</Tag>`}</Highlight>
                <Tag icon={faTag}>Tag</Tag>

                <pre>
                    <Highlight block>
                        {codeBlock`
                            <Tag icon={
                                <Icon icon={faExclamationTriangle} color="text-warning"/>
                            }>
                                <Text color="text-warning">Warning</Text>
                            </Tag>
                        `}
                    </Highlight>
                </pre>
                <Tag icon={
                    <Icon icon={faExclamationTriangle} color="text-warning"/>
                }>
                    <Text color="text-warning">Warning</Text>
                </Tag>
            </Grid>
            <Text variant="h2">Button</Text>
            <Grid gridTemplateColumns="1fr 1fr" gridGap="2rem" alignItems="center" justifyItems="flex-start">
                <Highlight>{`<Button>Button</Button>`}</Highlight>
                <Button>Button</Button>

                <Highlight>{`<Button variant="primary">Primary</Button>`}</Highlight>
                <Button variant="primary">Primary</Button>

                <Highlight>{`<Button silent>Silent</Button>`}</Highlight>
                <Button silent>Silent</Button>

                <pre>
                    <Highlight block>
                        {codeBlock`
                            <Button>
                                <Icon icon={faLightbulb}/>
                            </Button>
                        `}
                    </Highlight>
                </pre>
                <Button>
                    <Icon icon={faLightbulb}/>
                </Button>

                <pre>
                    <Highlight block>
                        {codeBlock`
                            <Button variant="primary">
                                <Icon icon={faLightbulb}/>
                            </Button>
                        `}
                    </Highlight>
                </pre>
                <Button variant="primary">
                    <Icon icon={faLightbulb}/>
                </Button>

                <pre>
                    <Highlight block>
                        {codeBlock`
                            <Button silent>
                                <Icon icon={faLightbulb}/>
                            </Button>
                        `}
                    </Highlight>
                </pre>
                <Button silent>
                    <Icon icon={faLightbulb}/>
                </Button>

                <pre>
                    <Highlight block>
                        {codeBlock`
                            <Button>
                                <Button as="span" variant="primary">
                                    <Icon icon={faPlay}/>
                                </Button>
                                Play
                            </Button>
                        `}
                    </Highlight>
                </pre>
                <Button>
                    <Button as="span" variant="primary">
                        <Icon icon={faPlay}/>
                    </Button>
                    Play
                </Button>

                <pre>
                    <Highlight block>
                        {codeBlock`
                            <Button>
                                <Button as="span" variant="primary">
                                    <Icon icon={faCompactDisc} spin/>
                                </Button>
                                Playing
                            </Button>
                        `}
                    </Highlight>
                </pre>
                <Button>
                    <Button as="span" variant="primary">
                        <Icon icon={faCompactDisc} spin/>
                    </Button>
                    Playing
                </Button>

                <pre>
                    <Highlight block>
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
                    </Highlight>
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
                    <Highlight block>
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
                    </Highlight>
                </pre>
                <Switcher
                    items={[ "anime", "themes", "artists" ]}
                    selectedItem={selectedItem}
                    onChange={setSelectedItem}
                />
                <pre>
                    <Highlight block>
                        {codeBlock`
                            // At the top of the component
                            const [selectedEntity, entitySwitcher] = useSwitcher(
                                [ "anime", "themes", "artists" ], 
                                "anime"
                            );
                            
                            // Inside the render output
                            {entitySwitcher}
                        `}
                    </Highlight>
                </pre>
                {entitySwitcher}
            </Grid>
            <Text variant="h2">Card</Text>
            <Grid gridTemplateColumns="1fr 1fr" gridGap="2rem" alignItems="center" justifyItems="flex-start">
                <pre>
                    <Highlight block>
                        {codeBlock`
                            <Card>
                                <Text>This is text inside a card.</Text>
                            </Card>
                        `}
                    </Highlight>
                </pre>
                <Card>
                    <Text>This is text inside a card.</Text>
                </Card>

                <pre>
                    <Highlight block>
                        {codeBlock`
                            <Card hoverable>
                                <Text>This is a hoverable card.</Text>
                            </Card>
                        `}
                    </Highlight>
                </pre>
                <Card hoverable>
                    <Text>This is a hoverable card.</Text>
                </Card>

                <pre>
                    <Highlight block>
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
                    </Highlight>
                </pre>
                <AnimeSummaryCard
                    anime={demoData.anime}
                    maxThemes={1}
                />
            </Grid>
            <Text variant="h2">Input</Text>
            <Grid gridTemplateColumns="1fr 1fr" gridGap="2rem" alignItems="center" justifyItems="flex-start">
                <Highlight>
                    {`<SearchInput/>`}
                </Highlight>
                <SearchInput/>
            </Grid>
            <Text variant="h2">Image</Text>
            <Grid gridTemplateColumns="1fr 1fr" gridGap="2rem" alignItems="center" justifyItems="flex-start">
                <pre>
                    <Highlight block>
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
                    </Highlight>
                </pre>
                <Box width="200px">
                    <CoverImage resourceWithImages={demoData.anime}/>
                </Box>
            </Grid>
            <Text variant="h2">Description List</Text>
            <Grid gridTemplateColumns="1fr 1fr" gridGap="2rem" alignItems="center" justifyItems="flex-start">
                <pre>
                    <Highlight block>
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
                    </Highlight>
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
                    <Highlight block>
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
                    </Highlight>
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
                    <Highlight block>
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
                    </Highlight>
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
                    <Highlight block>
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
                    </Highlight>
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

function Highlight({ children, block = false }) {
    const codeHighlighted = Prism.highlight(children, Prism.languages.jsx, "jsx");
    const codeBlock = (
        <Text
            variant="code"
            block={block}
            className="language-jsx"
            dangerouslySetInnerHTML={{ __html: codeHighlighted }}
        />
    );

    if (block) {
        return (
            <pre>
                {codeBlock}
            </pre>
        );
    }

    return codeBlock;
}

export async function getStaticProps() {
    const { data } = await fetchData(`
        #graphql

        query {
            anime(slug: "bakemonogatari") {
                name
                slug
                year
                season
                themes {
                    slug
                    type
                    sequence
                    entries {
                        version
                        videos {
                            tags
                        }
                    }
                }
                resources {
                    site
                    link
                }
                images {
                    facet
                    link
                }
            }
        }
    `);

    return {
        props: {
            demoData: data
        }
    };
}
