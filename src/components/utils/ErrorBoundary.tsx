import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import Link from "next/link";

import { Container } from "@/components/container/Container";
import { Text } from "@/components/text/Text";

interface ErrorBoundaryProps {
    children?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <Container>
                    <Text variant="h1">Something went wrong.</Text>
                    <Text as="p">
                        <span>You encountered an unhandled error. Please let us know about it on our </span>
                        <Text as="a" link href="https://discordapp.com/invite/m9zbVyQ">
                            Discord
                        </Text>
                        <span>. For now, you may </span>
                        <Text as={Link} href="/" link>
                            go back to the home page
                        </Text>
                        <span>.</span>
                    </Text>
                </Container>
            );
        }

        return this.props.children;
    }
}
