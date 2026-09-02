import { Text } from "@/components/text/Text";

interface ErrorListProps {
    errors: Array<string> | null | undefined;
}

export function ErrorList({ errors }: ErrorListProps) {
    if (!errors?.length) {
        return null;
    }

    return (
        <ul>
            {errors.map((error) => (
                <Text as="li" key={error} color="text-warning">
                    {error}
                </Text>
            ))}
        </ul>
    );
}
