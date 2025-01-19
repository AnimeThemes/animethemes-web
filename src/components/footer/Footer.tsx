import styled from "styled-components";
import Link from "next/link";

import { faDiscord, faGithub, faReddit, faTwitter } from "@fortawesome/free-brands-svg-icons";

import { Column, Row } from "@/components/box/Flex";
import { Solid } from "@/components/box/Solid";
import { Button } from "@/components/button/Button";
import { Container } from "@/components/container/Container";
import { Icon } from "@/components/icon/Icon";
import { Text } from "@/components/text/Text";
import theme from "@/theme";

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

    // To avoid overlap with scroll back to top button as window width gets smaller
    @media (max-width: ${theme.breakpoints.socialListMax}) and (min-width: ${theme.breakpoints.mobileMax}) {
        margin-right: 64px;
    }
`;

const StyledSocialButton = styled(Button).attrs({ variant: "silent", isCircle: true })`
    font-size: 1.2rem;
`;

const FooterLink = styled(Text).attrs({ as: Link })``;

const FooterTextLink = styled(FooterLink).attrs({
    link: true,
    block: true,
    color: "text-muted",
    noWrap: true,
})``;

export function Footer() {
    return (
        <StyledFooter>
            <StyledContainer>
                <StyledLinkList>
                    <FooterTextLink href="/about/faq">FAQ</FooterTextLink>
                    <FooterTextLink href="/about/donate">Donate</FooterTextLink>
                    <FooterTextLink href="/about/transparency">Transparency</FooterTextLink>
                    <FooterTextLink as="a" href="https://api-docs.animethemes.moe" target="_blank">
                        API Documentation
                    </FooterTextLink>
                </StyledLinkList>
                <StyledLinkList>
                    <FooterTextLink href="/about/terms-of-service">Terms of Service</FooterTextLink>
                    <FooterTextLink href="/about/privacy-policy">Privacy Policy</FooterTextLink>
                    <FooterTextLink as="a" href="mailto:admin@animethemes.moe">
                        Contact
                    </FooterTextLink>
                </StyledLinkList>
                <StyledSocialList>
                    <FooterLink href="https://reddit.com/r/AnimeThemes">
                        <StyledSocialButton title="Reddit">
                            <Icon icon={faReddit} />
                        </StyledSocialButton>
                    </FooterLink>
                    <FooterLink href="https://discordapp.com/invite/m9zbVyQ">
                        <StyledSocialButton title="Discord">
                            <Icon icon={faDiscord} />
                        </StyledSocialButton>
                    </FooterLink>
                    <FooterLink href="https://twitter.com/AnimeThemesMoe">
                        <StyledSocialButton title="Twitter">
                            <Icon icon={faTwitter} />
                        </StyledSocialButton>
                    </FooterLink>
                    <FooterLink href="https://github.com/AnimeThemes">
                        <StyledSocialButton title="GitHub">
                            <Icon icon={faGithub} />
                        </StyledSocialButton>
                    </FooterLink>
                </StyledSocialList>
            </StyledContainer>
        </StyledFooter>
    );
}
