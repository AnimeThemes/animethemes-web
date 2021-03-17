import { Box } from "components/box";
import { Text } from "components/text";
import { Link } from "gatsby";
import { SEO } from "components/seo";

export default function NotFoundPage() {
    return (
        <Box gapsColumn="1.5rem">
            <SEO title="404" />
            <Text variant="h1">Page not found</Text>
            <Text as="p">
                <span>The page you requested doesn&apos;t exist. If you believe this is an error, message us on </span>
                <Text as="a" link href="https://discordapp.com/invite/m9zbVyQ">Discord</Text>
                <span>. Otherwise you can </span>
                <Link to="/">
                    <Text link>go back to the home page</Text>
                </Link>
                <span>.</span>
            </Text>
        </Box>
    );
}
