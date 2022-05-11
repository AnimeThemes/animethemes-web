// This function generates a set of props that should be provided to every single page.
export default function getSharedPageProps(apiRequests = 0) {
    return {
        lastBuildAt: Date.now(),
        apiRequests
    };
}
