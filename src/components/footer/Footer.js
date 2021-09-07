import { Box, Flex } from "components/box";
import { Container } from "components/container";
import { Text } from "components/text";
import { Icon } from "components/icon";
import { faDiscord, faGithub, faReddit, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Button } from "components/button";
import styled from "styled-components";

const StyledSocialButton = styled(Button).attrs({
    variant: "on-card",
    silent: true
})`
    font-size: 1.2rem;
`;

export function Footer() {
    return (
        <Box mt="auto" bg="solid">
            <Container>
                <Flex flexWrap="wrap" gapsBoth="1rem">
                    <Box flex="1" gapsColumn="1rem">
                        <FooterTextLink href="https://staging.animethemes.moe/transparency">
                            Transparency
                        </FooterTextLink>
                        <FooterTextLink href="https://staging.animethemes.moe/donate">
                            Donate
                        </FooterTextLink>
                        <FooterTextLink href="https://staging.animethemes.moe/faq">
                            FAQ
                        </FooterTextLink>
                    </Box>
                    <Box flex="1" gapsColumn="1rem">
                        <FooterTextLink href="https://staging.animethemes.moe/terms-of-service">
                            Terms of Service
                        </FooterTextLink>
                        <FooterTextLink href="https://staging.animethemes.moe/privacy-policy">
                            Privacy Policy
                        </FooterTextLink>
                        <FooterTextLink href="mailto:admin@animethemes.moe">
                            Contact
                        </FooterTextLink>
                    </Box>
                    <Flex flex="2" justifyContent={[ "flex-start", "flex-end" ]} alignItems="flex-end">
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
                    </Flex>
                </Flex>
            </Container>
        </Box>
    );
}

function FooterLink({ children, ...props }) {
    return (
        <Text as="a" target="_blank" rel="noopener" {...props}>
            {children}
        </Text>
    );
}

function FooterTextLink({ children, ...props }) {
    return (
        <FooterLink link block color="text-muted" noWrap {...props}>
            {children}
        </FooterLink>
    );
}
