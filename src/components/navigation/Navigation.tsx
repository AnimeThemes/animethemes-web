import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { faMagnifyingGlass, faTv, faUser } from "@fortawesome/free-solid-svg-icons";

import { IconTextButton } from "@/components/button/IconTextButton";
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
                    <StyledLogoContainer as={Link} href="/">
                        <StyledLogo width="277" height="150" />
                    </StyledLogoContainer>
                    <StyledNavigationLinks>
                        <IconTextButton
                            asChild
                            icon={faMagnifyingGlass}
                            variant="silent"
                            collapsible
                            style={{ "--gap": "8px" }}
                        >
                            <Link href="/search">Search</Link>
                        </IconTextButton>
                        {/*<ShuffleDialog*/}
                        {/*    trigger={*/}
                        {/*        <IconTextButton*/}
                        {/*            variant="silent"*/}
                        {/*            icon={faShuffle}*/}
                        {/*            collapsible*/}
                        {/*            style={{ "--gap": "8px" }}*/}
                        {/*        >*/}
                        {/*            Shuffle*/}
                        {/*        </IconTextButton>*/}
                        {/*    }*/}
                        {/*/>*/}

                        <IconTextButton asChild variant="silent" icon={faTv} collapsible style={{ "--gap": "8px" }}>
                            <Link href={currentYear && currentSeason ? `/year/${currentYear}/${currentSeason}` : "/"}>
                                Current Season
                            </Link>
                        </IconTextButton>

                        <IconTextButton
                            asChild
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
                            <Link href="/profile">My Profile</Link>
                        </IconTextButton>
                    </StyledNavigationLinks>
                </StyledNavigationContainer>
            </StyledNavigation>
        </>
    );
}
