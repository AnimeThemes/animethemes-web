import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { faRandom, faSearch, faTv, faUser } from "@fortawesome/pro-solid-svg-icons";

import { IconTextButton } from "@/components/button/IconTextButton";
import { ShuffleDialog } from "@/components/dialog/ShuffleDialog";
import {
    StyledLogo,
    StyledLogoContainer,
    StyledNavigation,
    StyledNavigationContainer,
    StyledNavigationLinks,
    StyledProfileImage,
    StyledProfileImageIcon,
} from "@/components/navigation/Navigation.style";
import useAuth from "@/hooks/useAuth";
import useCurrentSeason from "@/hooks/useCurrentSeason";

export function Navigation() {
    const { me } = useAuth();

    const { currentYear, currentSeason } = useCurrentSeason();

    const router = useRouter();
    const [prevPathname, setPrevPathname] = useState(router.pathname);

    const [isFloating, setFloating] = useState(true);

    useEffect(() => {
        function onScroll() {
            setFloating(window.scrollY === 0);
        }

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // If the user clicks on a link which sends them to another page,
    // we want to close the modal navigation.
    if (router.pathname !== prevPathname) {
        setPrevPathname(router.pathname);
        return null;
    }

    return (
        <>
            <StyledNavigation $floating={isFloating}>
                <StyledNavigationContainer onClick={(event) => event.stopPropagation()}>
                    <Link href="/" passHref legacyBehavior>
                        <StyledLogoContainer>
                            <StyledLogo width="277" height="150" />
                        </StyledLogoContainer>
                    </Link>
                    <StyledNavigationLinks>
                        <Link href="/search" passHref legacyBehavior>
                            <IconTextButton
                                forwardedAs="a"
                                icon={faSearch}
                                variant="silent"
                                collapsible
                                style={{ "--gap": "8px" }}
                            >
                                Search
                            </IconTextButton>
                        </Link>
                        <ShuffleDialog
                            trigger={
                                <IconTextButton variant="silent" icon={faRandom} collapsible style={{ "--gap": "8px" }}>
                                    Shuffle
                                </IconTextButton>
                            }
                        />
                        <Link
                            href={currentYear && currentSeason ? `/year/${currentYear}/${currentSeason}` : "/"}
                            passHref
                            legacyBehavior
                        >
                            <IconTextButton
                                forwardedAs="a"
                                variant="silent"
                                icon={faTv}
                                collapsible
                                style={{ "--gap": "8px" }}
                            >
                                Current Season
                            </IconTextButton>
                        </Link>
                        <Link href="/profile" passHref legacyBehavior>
                            <IconTextButton
                                forwardedAs="a"
                                variant="silent"
                                icon={
                                    me.user ? (
                                        <StyledProfileImageIcon>
                                            <StyledProfileImage user={me.user} />
                                        </StyledProfileImageIcon>
                                    ) : (
                                        faUser
                                    )
                                }
                                title="My Profile"
                                collapsible
                            >
                                My Profile
                            </IconTextButton>
                        </Link>
                    </StyledNavigationLinks>
                </StyledNavigationContainer>
            </StyledNavigation>
        </>
    );
}
