import { useContext, useEffect, useState } from "react";
import { Link, withPrefix } from "gatsby";
import {
    faBars,
    faLightbulb,
    faMoon,
    faRandom,
    faSearch,
    faSpinner,
    faTimes,
    faTv
} from "@fortawesome/free-solid-svg-icons";
import {
    StyledLogo,
    StyledLogoContainer,
    StyledMobileToggle,
    StyledNavigation,
    StyledNavigationContainer
} from "./Navigation.style";
import { Button } from "components/button";
import ColorThemeContext from "context/colorThemeContext";
import { Icon } from "components/icon";
import { Text } from "components/text";
import { Flex } from "components/box";
import { useLocation } from "@reach/router";
import useCurrentSeason from "hooks/useCurrentSeason";
import navigateToRandomTheme from "utils/navigateToRandomTheme";

export function Navigation() {
    const [ show, setShow ] = useState(false);
    const { colorTheme, toggleColorTheme } = useContext(ColorThemeContext);
    const location = useLocation();

    const { currentYear, currentSeason } = useCurrentSeason();

    // If the user clicks on a link which sends them to another page,
    // we want to close the modal navigation.
    useEffect(() => {
        setShow(false);
    }, [location]);

    return (
        <>
            <StyledNavigation show={show} onClick={() => setShow(false)}>
                <StyledNavigationContainer onClick={(event) => event.stopPropagation()}>
                    <StyledLogoContainer to="/">
                        <StyledLogo className="navigation__logo-image" src={withPrefix("/img/logo.svg")} alt="Logo" />
                    </StyledLogoContainer>
                    <Flex
                        flexDirection={[ "column", "row" ]}
                        gapsRow={[ 0, "0.5rem" ]}
                        gapsColumn={[ "0.5rem", 0 ]}
                        alignItems="flex-start"
                    >
                        <Link to="/search">
                            <Button variant="on-card" silent gapsRow="0.5rem">
                                <Icon icon={faSearch}/>
                                <Text>Search</Text>
                            </Button>
                        </Link>
                        <Button variant="on-card" silent gapsRow="0.5rem" onClick={navigateToRandomTheme}>
                            <Icon icon={faRandom}/>
                            <Text>Play Random</Text>
                        </Button>
                        <Link to={`/year/${currentYear}/${currentSeason}`}>
                            <Button variant="on-card" silent gapsRow="0.5rem">
                                <Icon icon={faTv}/>
                                <Text>Current Season</Text>
                            </Button>
                        </Link>
                        <Button variant="on-card" silent onClick={toggleColorTheme} alignSelf="center">
                            <Icon icon={colorTheme === null ? faSpinner : colorTheme === "dark" ? faLightbulb : faMoon} spin={colorTheme === null} />
                        </Button>
                    </Flex>
                </StyledNavigationContainer>
            </StyledNavigation>

            <StyledMobileToggle variant={show ? "default" : "primary"} onClick={() => setShow(!show)}>
                <Icon icon={show ? faTimes : faBars}/>
            </StyledMobileToggle>
        </>
    );
}
