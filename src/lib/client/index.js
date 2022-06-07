export async function fetchDataClient(...args) {
    // Code-split anything GraphQL related to reduce initial bundle size.
    const { fetchDataClient } = await import("./chunk");

    return fetchDataClient(...args);
}
