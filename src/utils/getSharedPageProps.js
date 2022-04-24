// This function generates a set of props that should be provided to every single page.
export default function getSharedPageProps() {
    return {
        lastBuildAt: Date.now()
    };
}
