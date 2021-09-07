import { Card } from "components/card";
import { Flex } from "components/box";
import { Text } from "components/text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

export function ErrorCard({ error }) {
    return (
        <Card gapsColumn="1.5rem" borderColor="text-warning">
            <Flex gapsRow="1rem">
                <Text color="text-warning">
                    <FontAwesomeIcon icon={faExclamation}/>
                </Text>
                <Text block>An error occurred while searching! Help improving the site by sending us the following error message:</Text>
            </Flex>
            <pre>
                <Text variant="code" block bg="solid-on-card" overflow="auto">
                    {JSON.stringify(error, null, 2)}
                </Text>
            </pre>
        </Card>
    );
}