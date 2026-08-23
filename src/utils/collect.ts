export default async function collect<T>(
    collector: (cursor: string | null) => Promise<{ items: Array<T>; nextCursor: string | null; hasNextPage: boolean }>,
) {
    const collection: Array<T> = [];
    let result;
    do {
        result = await collector(result?.nextCursor ?? null);
        collection.push(...result.items);
    } while (result.nextCursor !== null && result.hasNextPage);
    return collection;
}
