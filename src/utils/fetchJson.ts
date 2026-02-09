export default async function fetchJson<T = Record<string, unknown>>(
    url: string,
    config: RequestInit = {},
): Promise<T | null> {
    const response = await fetch(url, config);

    if (!response.ok) {
        if (response.status === 404 || response.status === 401 || response.status === 403) {
            return null;
        }

        throw new Error(
            `API returned with non-ok status code: ${response.status} (${response.statusText}) for ${url}.`,
        );
    }

    try {
        return await response.json();
    } catch {
        throw new Error(`API returned invalid JSON for ${url}.`);
    }
}
