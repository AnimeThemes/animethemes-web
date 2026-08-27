import * as fs from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.join(currentDir, "..", "..");
const cacheDir = path.join(projectDir, "build-cache");

const inMemoryCache = new Map<string, Promise<Map<string, unknown>>>();

export async function readCache<T extends Map<string, unknown>>(id: string) {
    if (inMemoryCache.has(id)) {
        return (await inMemoryCache.get(id)) as T;
    }

    const promise = fs
        .readFile(path.join(cacheDir, `${id}.json`), "utf-8")
        .then((data) => new Map(JSON.parse(data)) as T);

    inMemoryCache.set(id, promise);

    return await promise;
}

export async function writeCache(id: string, data: Map<string, unknown>) {
    try {
        await fs.mkdir(cacheDir);
    } catch {}

    await fs.writeFile(path.join(cacheDir, `${id}.json`), JSON.stringify([...data.entries()]));

    inMemoryCache.set(id, Promise.resolve(data));
}
