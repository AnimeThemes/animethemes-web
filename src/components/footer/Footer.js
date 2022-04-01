import Link from "next/link";
import { Column, Row, Solid } from "components/box";
import { Container } from "components/container";
import { Text } from "components/text";
import { Icon } from "components/icon";
import { faDiscord, faGithub, faReddit, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Button } from "components/button";
import styled from "styled-components";
import theme from "theme";
import { forwardRef } from "react";

const StyledFooter = styled(Solid)`
    margin-top: auto;
`;

const StyledContainer = styled(Container)`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
`;

const StyledLinkList = styled(Column)`
    flex: 1;
    gap: 16px;
`;

const StyledSocialList = styled(Row)`
    flex: 2;
    justify-content: flex-end;
    align-items: flex-end;
    gap: 4px;

    @media (max-width: ${theme.breakpoints.mobileMax}) {
        flex-basis: 100%;
        justify-content: flex-start;
    }
`;

const StyledSocialButton = styled(Button).attrs({ variant: "silent", isCircle: true })`
    font-size: 1.2rem;
`;

export function Footer() {
    return (
        <StyledFooter>
            <StyledContainer>
                <StyledLinkList>
                    <FooterTextLink href="https://staging.animethemes.moe/transparency">
                        Transparency
                    </FooterTextLink>
                    <Link href="/page/donate" passHref>
                        <FooterTextLink target="_self">
                            Donate
                        </FooterTextLink>
                    </Link>
                    <Link href="/page/faq" passHref>
                        <FooterTextLink target="_self">
                            FAQ
                        </FooterTextLink>
                    </Link>
                </StyledLinkList>
                <StyledLinkList>
                    <FooterTextLink href="https://staging.animethemes.moe/terms-of-service">
                        Terms of Service
                    </FooterTextLink>
                    <FooterTextLink href="https://staging.animethemes.moe/privacy-policy">
                        Privacy Policy
                    </FooterTextLink>
                    <FooterTextLink href="mailto:admin@animethemes.moe">
                        Contact
                    </FooterTextLink>
                </StyledLinkList>
                <StyledSocialList>
                    <FooterLink href="https://reddit.com/r/AnimeThemes">
                        <StyledSocialButton title="Reddit">
                            <Icon icon={faReddit}/>
                        </StyledSocialButton>
                    </FooterLink>
                    <FooterLink href="https://discordapp.com/invite/m9zbVyQ">
                        <StyledSocialButton title="Discord">
                            <Icon icon={faDiscord}/>
                        </StyledSocialButton>
                    </FooterLink>
                    <FooterLink href="https://twitter.com/AnimeThemesMoe">
                        <StyledSocialButton title="Twitter">
                            <Icon icon={faTwitter}/>
                        </StyledSocialButton>
                    </FooterLink>
                    <FooterLink href="https://github.com/AnimeThemes">
                        <StyledSocialButton title="GitHub">
                            <Icon icon={faGithub}/>
                        </StyledSocialButton>
                    </FooterLink>
                </StyledSocialList>
            </StyledContainer>
        </StyledFooter>
    );
}

const FooterLink = forwardRef(function FooterLink({ children, ...props }, ref) {
    return (
        <Text ref={ref} as="a" target="_blank" rel="noopener" {...props}>
            {children}
        </Text>
    );
});

const FooterTextLink = forwardRef(function FooterTextLink({ children, ...props }, ref) {
    return (
        <FooterLink ref={ref} link block color="text-muted" noWrap {...props}>
            {children}
        </FooterLink>
    );
});
