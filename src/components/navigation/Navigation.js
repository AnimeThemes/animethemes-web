import { useContext, useEffect, useState } from "react";
import { Link, withPrefix } from "gatsby";
import { faBars, faLightbulb, faMoon, faSearch, faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";
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

export function Navigation() {
    const [ show, setShow ] = useState(false);
    const { colorTheme, toggleColorTheme } = useContext(ColorThemeContext);
    const location = useLocation();

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
                    <Flex gapsRow="0.5rem">
                        {/* Other links */}
                        <Link to="/search">
                            <Button variant="on-card" silent gapsRow="0.5rem">
                                <Icon icon={faSearch}/>
                                <Text>Search</Text>
                            </Button>
                        </Link>
                        <Button variant="on-card" silent onClick={toggleColorTheme}>
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
