export interface SharedPageProps {
    lastBuildAt: number;
}

// This function generates a set of props that should be provided to every single page.
export default function getSharedPageProps(): SharedPageProps {
    return {
        lastBuildAt: Date.now(),
    };
}
