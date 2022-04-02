import { useContext, useState } from "react";
import { Column, Row } from "components/box";
import { AnimeSummaryCard, Card } from "components/card";
import { Text } from "components/text";
import { Button, IconTextButton, VideoButton } from "components/button";
import {
    faArrowRight,
    faChevronDown,
    faExclamationTriangle,
    faLightbulb,
    faMoon,
    faPlay,
    faRocket,
    faSpinner,
    faStar,
    faTag
} from "@fortawesome/free-solid-svg-icons";
import { Icon } from "components/icon";
import styled from "styled-components";
import theme from "theme";
import { Collapse, HeightTransition, Highlight } from "components/utils";
import ColorThemeContext from "context/colorThemeContext";
import { ExternalLink } from "components/external-link";
import { Switcher } from "components/switcher";
import useToggle from "hooks/useToggle";
import { Tag } from "components/tag";
import { CoverImage } from "components/image";
import { DescriptionList } from "components/description-list";
import { codeBlock } from "common-tags";
import { Listbox } from "components/listbox";
import { fetchData } from "lib/server";
import { Menu } from "components/menu";
import { Toast } from "components/toast";
import { useToasts } from "context/toastContext";
import { Input } from "components/input";
import gql from "graphql-tag";

const ColorGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20ch, 1fr));
    grid-gap: 16px;
    justify-content: space-around;
`;
const ColorBox = styled.div`
    width: 3rem;
    height: 3rem;
    border: 2px solid ${theme.colors["primaryTitle"]};
    border-radius: 0.5rem;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
    background-color: var(--color);
`;

const ExampleGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: flex-start;
    align-items: center;
    grid-gap: 32px;
`;
const ExampleFullWidth = styled.div`
    grid-column: 1 / 3;
    
    display: flex;
    gap: 8px;
`;

export default function DesignPage({ demoData }) {
    const { colorTheme, toggleColorTheme } = useContext(ColorThemeContext);
    const [moreColors, setMoreColors] = useState(false);

    const colors = Object.keys(theme.colors);

    const [selectedItem, setSelectedItem] = useState(null);
    const [season, setSeason] = useState(null);

    const [maxLines, toggleMaxLines] = useToggle(1, 0);
    const [collapse, toggleCollapse] = useToggle();

    const { dispatchToast, closeToast } = useToasts();

    return (
        <Column style={{ "--gap": "48px" }}>
            <Text variant="h1">Design Documentation</Text>
            <Row style={{ "--justify-content": "space-between", "--align-items": "center" }}>
                <Text variant="h2">Color</Text>
                <IconTextButton
                    icon={colorTheme === null ? faSpinner : colorTheme === "dark" ? faLightbulb : faMoon}
                    onClick={toggleColorTheme}
                >Switch Theme</IconTextButton>
            </Row>
            <HeightTransition fixShadows>
                <ColorGrid>
                    {colors.slice(0, moreColors ? colors.length : Math.min(15, colors.length)).map((color) => (
                        <Color key={color} color={color}/>
                    ))}
                </ColorGrid>
            </HeightTransition>
            <Row style={{ "--justify-content": "flex-end" }}>
                <IconTextButton
                    icon={faChevronDown} rotation={moreColors ? 180 : undefined}
                    onClick={() => setMoreColors((val) => !val)}
                >{moreColors ? "Show less" : "Show more"}</IconTextButton>
            </Row>

            <Text variant="h2">Typography</Text>
            <ExampleGrid>
                <Highlight>{`<Text>This is normal text.</Text>`}</Highlight>
                <Text>This is normal text.</Text>

                <ExampleFullWidth>
                    <Icon icon={faArrowRight} color="text-primary" />
                    <Text as="p" color="text-muted">Always wrap text in a <Highlight>{`<Text>`}</Highlight> component. This way basic styling is applied and default browser values get overridden.</Text>
                </ExampleFullWidth>

                <Highlight>{`<Text variant="h1">This is a page title.</Text>`}</Highlight>
                <Text variant="h1">This is a page title.</Text>

                <Highlight>{`<Text variant="h2">This is a section title.</Text>`}</Highlight>
                <Text variant="h2">This is a section title.</Text>

                <Highlight>{`<Text variant="small">This is small text.</Text>`}</Highlight>
                <Text variant="small">This is small text.</Text>

                <Highlight>{`<Text variant="code">This is code.</Text>`}</Highlight>
                <Text variant="code">This is code.</Text>

                <ExampleFullWidth>
                    <Icon icon={faArrowRight} color="text-primary" />
                    <Text as="p" color="text-muted">Use the <Text variant="code">variant</Text> prop to apply pre-defined styles to your text.</Text>
                </ExampleFullWidth>

                <Highlight>{`<Text maxLines={1}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</Text>`}</Highlight>
                <Text maxLines={1}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</Text>

                <Highlight>{`<Text maxLines={3}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</Text>`}</Highlight>
                <Text maxLines={3}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</Text>

                <ExampleFullWidth>
                    <Icon icon={faArrowRight} color="text-primary" />
                    <Text as="p" color="text-muted">Use the <Text variant="code">maxLines</Text> prop to add a limit to the number of lines a text should have. Overflowing text will get replaced with three dots (<Text variant="code">...</Text>)</Text>
                </ExampleFullWidth>

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
            </ExampleGrid>

            <Text variant="h2">Iconography</Text>
            <ExampleGrid>
                <Highlight>{`<Icon icon={faRocket}/>`}</Highlight>
                <Icon icon={faRocket}/>

                <Highlight>{`<Icon icon={faStar} color="text-primary"/>`}</Highlight>
                <Icon icon={faStar} color="text-primary"/>

                <Highlight>{`<Icon icon={faSpinner} spin/>`}</Highlight>
                <Icon icon={faSpinner} spin/>
            </ExampleGrid>

            <Text variant="h2">Tag</Text>
            <ExampleGrid>
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
            </ExampleGrid>

            <Text variant="h2">Button</Text>
            <ExampleGrid>
                <Highlight>{`<Button>Button</Button>`}</Highlight>
                <Button>Button</Button>

                <Highlight>{`<Button variant="primary">Primary</Button>`}</Highlight>
                <Button variant="primary">Primary</Button>

                <Highlight>{`<Button variant="silent">Silent</Button>`}</Highlight>
                <Button variant="silent">Silent</Button>

                <pre>
                    <Highlight block>
                        {codeBlock`
                            <Card>
                                <Button>On Card</Button>
                                <Button variant="silent">On Card</Button>
                            </Card>
                        `}
                    </Highlight>
                </pre>
                <Card>
                    <Row style={{ "--gap": "8px" }}>
                        <Button>On Card</Button>
                        <Button variant="silent">Silent On Card</Button>
                    </Row>
                </Card>

                <pre>
                    <Highlight block>
                        {codeBlock`
                            <Button isCircle>
                                <Icon icon={faLightbulb}/>
                            </Button>
                        `}
                    </Highlight>
                </pre>
                <Button isCircle>
                    <Icon icon={faLightbulb}/>
                </Button>

                <pre>
                    <Highlight block>
                        {codeBlock`
                            <Button variant="primary" isCircle>
                                <Icon icon={faLightbulb}/>
                            </Button>
                        `}
                    </Highlight>
                </pre>
                <Button variant="primary" isCircle>
                    <Icon icon={faLightbulb}/>
                </Button>

                <pre>
                    <Highlight block>
                        {codeBlock`
                            <Button variant="silent" isCircle>
                                <Icon icon={faLightbulb}/>
                            </Button>
                        `}
                    </Highlight>
                </pre>
                <Button variant="silent" isCircle>
                    <Icon icon={faLightbulb}/>
                </Button>

                <pre>
                    <Highlight block>
                        {codeBlock`
                            <Button>
                                <Button as="span" variant="primary">
                                    Prefixed
                                </Button>
                                Button
                            </Button>
                        `}
                    </Highlight>
                </pre>
                <Button>
                    <Button as="span" variant="primary">
                        Prefixed
                    </Button>
                    Button
                </Button>

                <pre>
                    <Highlight block>
                        {codeBlock`
                            <Button>
                                <Button as="span" variant="primary" isCircle>
                                    <Icon icon={faPlay}/>
                                </Button>
                                Playing
                            </Button>
                        `}
                    </Highlight>
                </pre>
                <Button>
                    <Button as="span" variant="primary" isCircle>
                        <Icon icon={faPlay}/>
                    </Button>
                    Play
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
            </ExampleGrid>

            <Text variant="h2">Switcher</Text>
            <ExampleGrid>
                <pre>
                    <Highlight block>
                        {codeBlock`
                            // At the top of the component
                            const [selectedItem, setSelectedItem] = useState(null);
                            
                            // Inside the render output
                            <Switcher selectedItem={selectedItem} onChange={setSelectedItem}>
                                <Switcher.Reset/>
                                <Switcher.Option value="anime">Anime</Switcher.Option>
                                <Switcher.Option value="theme">Themes</Switcher.Option>
                                <Switcher.Option value="artists">Artists</Switcher.Option>
                            </Switcher>
                        `}
                    </Highlight>
                </pre>
                <Switcher selectedItem={selectedItem} onChange={setSelectedItem}>
                    <Switcher.Reset/>
                    <Switcher.Option value="anime">Anime</Switcher.Option>
                    <Switcher.Option value="theme">Themes</Switcher.Option>
                    <Switcher.Option value="artists">Artists</Switcher.Option>
                </Switcher>
            </ExampleGrid>

            <Text variant="h2">Card</Text>
            <ExampleGrid>
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
                            // At the top of the component
                            const anime = /* ... */
                            
                            // Inside the render output
                            <AnimeSummaryCard
                                anime={anime}
                                maxThemes={1}
                            />
                        `}
                    </Highlight>
                </pre>
                <AnimeSummaryCard
                    anime={demoData.anime}
                    previewThemes={1}
                />
            </ExampleGrid>

            <Text variant="h2">Input</Text>
            <ExampleGrid>
                <Highlight>
                    {`<Input/>`}
                </Highlight>
                <Input/>
            </ExampleGrid>

            <Text variant="h2">Image</Text>
            <ExampleGrid>
                <pre>
                    <Highlight block>
                        {codeBlock`
                            // At the top of the component
                            const anime = /* ... */
                            
                            // Inside the render output
                            <div style={{ width: "200px" }}>
                                <CoverImage resourceWithImages={anime}/>
                            </div>
                        `}
                    </Highlight>
                </pre>
                <div style={{ width: "200px" }}>
                    <CoverImage resourceWithImages={demoData.anime}/>
                </div>
            </ExampleGrid>

            <Text variant="h2">Description List</Text>
            <ExampleGrid>
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
            </ExampleGrid>

            <Text variant="h2">Experimental</Text>
            <ExampleGrid>
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
                    value={season}
                    onChange={setSeason}
                    resettable
                    width="150px"
                >
                    <Listbox.Option value={null} hidden>Any</Listbox.Option>
                    <Listbox.Option value="winter">Winter</Listbox.Option>
                    <Listbox.Option value="spring">Spring</Listbox.Option>
                    <Listbox.Option value="summer">Summer</Listbox.Option>
                    <Listbox.Option value="fall">Fall</Listbox.Option>
                </Listbox>
                <pre>
                    <Highlight block>
                        {codeBlock`
                            <Menu>
                                <Menu.Option onSelect={() => alert("1")}>Option 1</Menu.Option>
                                <Menu.Option onSelect={() => alert("2")}>Option 2</Menu.Option>
                                <Menu.Option onSelect={() => alert("3")}>Option 3</Menu.Option>
                            </Menu>
                        `}
                    </Highlight>
                </pre>
                <Menu>
                    <Menu.Option onSelect={() => alert("1")}>Option 1</Menu.Option>
                    <Menu.Option onSelect={() => alert("2")}>Option 2</Menu.Option>
                    <Menu.Option onSelect={() => alert("3")}>Option 3</Menu.Option>
                </Menu>
                <pre>
                    <Highlight block>
                        {codeBlock`
                            // At the top of the component
                            const { dispatchToast, closeToast } = useToasts();
                            
                            // Inside the render output
                            <Button onClick={() => dispatchToast(
                                "example-toast",
                                <Toast
                                    hoverable
                                    onClick={() => closeToast("example-toast")}
                                >
                                    This is a toast. 
                                    It will close in 10 seconds or if you click on it.
                                </Toast>,
                                10_000
                            )}>
                                Show Toast
                            </Button>
                        `}
                    </Highlight>
                </pre>
                <Button onClick={() => dispatchToast(
                    "example-toast",
                    <Toast
                        hoverable
                        onClick={() => closeToast("example-toast")}
                    >
                        This is a toast.
                        It will close in 10 seconds or if you click on it.
                    </Toast>,
                    10_000
                )}>
                    Show Toast
                </Button>
            </ExampleGrid>

            <Text variant="h2">Utils</Text>
            <ExampleGrid>
                <pre>
                    <Highlight block>
                        {codeBlock`
                            // At the top of the component
                            const [maxLines, toggleMaxLines] = useToggle(1, 0);
                            
                            // Inside the render output
                            <Card style={{ "--gap": "16px" }}>
                                <HeightTransition>
                                    <Text maxLines={maxLines}>
                                        Lorem ipsum dolor sit amet ...
                                    </Text>
                                </HeightTransition>
                                <Button onClick={toggleMaxLines}>
                                    Toggle text length
                                </Button>
                            </Card>
                        `}
                    </Highlight>
                </pre>
                <Card style={{ "--gap": "16px" }}>
                    <HeightTransition>
                        <Text maxLines={maxLines}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                        </Text>
                    </HeightTransition>
                    <Button onClick={toggleMaxLines}>
                        Toggle text length
                    </Button>
                </Card>
                <pre>
                    <Highlight block>
                        {codeBlock`
                            // At the top of the component
                            const [collapse, toggleCollapse] = useToggle();
                            
                            // Inside the render output
                            <Card style={{ "--gap": "16px" }}>
                                <Collapse collapse={collapse}>
                                    <Text>
                                        Lorem ipsum dolor sit amet ...
                                    </Text>
                                </Collapse>
                                <Button onClick={toggleCollapse}>
                                    Toggle collapse
                                </Button>
                            </Card>
                        `}
                    </Highlight>
                </pre>
                <Card style={{ "--gap": "16px" }}>
                    <Collapse collapse={collapse}>
                        <Text>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                        </Text>
                    </Collapse>
                    <Button onClick={toggleCollapse}>
                        Toggle collapse
                    </Button>
                </Card>
            </ExampleGrid>
        </Column>
    );
}

function Color({ color }) {
    return (
        <Column style={{ "--align-items": "center", "--gap": "8px" }}>
            <ColorBox style={{ "--color": theme.colors[color] }}/>
            <Text variant="code">{color}</Text>
        </Column>
    );
}

export async function getStaticProps() {
    const { data } = await fetchData(gql`
        ${AnimeSummaryCard.fragments.anime}
        ${AnimeSummaryCard.fragments.previewThemes}
        
        query {
            anime(slug: "bakemonogatari") {
                ...AnimeSummaryCard_anime
                ...AnimeSummaryCard_anime_previewThemes
            }
        }
    `);

    return {
        props: {
            demoData: data
        }
    };
}
