import { Text } from "components/text";
import { SEO } from "components/seo";
import { TextLink } from "components/text/TextLink";

export default function NotFoundPage() {
    return <>
        <SEO title="Page not found"/>
        <Text variant="h1">Page not found</Text>
        <Text as="p">
            <span>The page you requested doesn&apos;t exist. If you believe this is an error, message us on </span>
            <Text as="a" link href="https://discordapp.com/invite/m9zbVyQ">Discord</Text>
            <span>. Otherwise you can </span>
            <TextLink href="/">go back to the home page</TextLink>
            <span>.</span>
        </Text>
    </>;
}
