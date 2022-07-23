export type SharedPageProps = {
    lastBuildAt: number,
    apiRequests: number,
};

// This function generates a set of props that should be provided to every single page.
export default function getSharedPageProps(apiRequests = 0): SharedPageProps {
    return {
        lastBuildAt: Date.now(),
        apiRequests
    };
}
