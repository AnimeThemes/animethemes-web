import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import {
    faBars,
    faLightbulb,
    faMoon,
    faRandom,
    faSearch,
    faSpinner,
    faTimes,
    faTv, faUser
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
import useCurrentSeason from "hooks/useCurrentSeason";
import navigateToRandomTheme from "utils/navigateToRandomTheme";
import { useRouter } from "next/router";
import withBasePath from "utils/withBasePath";

export function Navigation({ offsetToggleButton = false }) {
    const [ show, setShow ] = useState(false);
    const { colorTheme, toggleColorTheme } = useContext(ColorThemeContext);
    const router = useRouter();

    const { currentYear, currentSeason } = useCurrentSeason();

    // If the user clicks on a link which sends them to another page,
    // we want to close the modal navigation.
    useEffect(() => {
        setShow(false);
    }, [router.pathname]);

    return (
        <>
            <StyledNavigation show={show} onClick={() => setShow(false)}>
                <StyledNavigationContainer onClick={(event) => event.stopPropagation()}>
                    <Link href="/" passHref>
                        <StyledLogoContainer>
                            <StyledLogo
                                src={withBasePath("/img/logo.svg")}
                                alt="Logo"
                                width="277"
                                height="150"
                            />
                        </StyledLogoContainer>
                    </Link>
                    <Flex
                        flexDirection={[ "column", "row" ]}
                        gapsRow={[ 0, "0.5rem" ]}
                        gapsColumn={[ "0.5rem", 0 ]}
                        alignItems={[ "flex-start", "center" ]}
                    >
                        <Link href="/search" passHref>
                            <Button as="a" variant="on-card" silent gapsRow="0.5rem">
                                <Icon icon={faSearch}/>
                                <Text>Search</Text>
                            </Button>
                        </Link>
                        <Button variant="on-card" silent gapsRow="0.5rem" onClick={navigateToRandomTheme}>
                            <Icon icon={faRandom}/>
                            <Text>Play Random</Text>
                        </Button>
                        <Link href={(currentYear && currentSeason) ? `/year/${currentYear}/${currentSeason}` : "/"} passHref>
                            <Button as="a" variant="on-card" silent gapsRow="0.5rem">
                                <Icon icon={faTv}/>
                                <Text>Current Season</Text>
                            </Button>
                        </Link>
                        <Link href="/profile" passHref>
                            <Button
                                as="a"
                                variant="on-card"
                                silent
                                title="My Profile"
                                gapsRow="0.5rem"
                            >
                                <Icon icon={faUser}/>
                                <Text display={[ "initial", "none", "initial" ]}>My Profile</Text>
                            </Button>
                        </Link>
                        <Button
                            variant="on-card"
                            silent
                            onClick={toggleColorTheme}
                            alignSelf="center"
                            title="Toggle color theme"
                        >
                            <Icon icon={colorTheme === null ? faSpinner : colorTheme === "dark" ? faLightbulb : faMoon} spin={colorTheme === null} />
                        </Button>
                    </Flex>
                </StyledNavigationContainer>
            </StyledNavigation>

            <StyledMobileToggle
                variant={show ? "default" : "primary"}
                offsetToggleButton={offsetToggleButton}
                onClick={() => setShow(!show)}
            >
                <Icon icon={show ? faTimes : faBars}/>
            </StyledMobileToggle>
        </>
    );
}
