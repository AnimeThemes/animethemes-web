const fetch = require("node-fetch");

const baseUrl = process.env.GATSBY_API_URL || "https://staging.animethemes.moe";

const requestCooldown = 1500;
let lastRequest;

async function fetchJson(url, init) {
    // Debounce, we should only request once every second
    if (lastRequest) {
        const expiredTime = Date.now() - lastRequest;
        if (expiredTime < requestCooldown) {
            await sleep(requestCooldown - expiredTime);
        }
    }

    lastRequest = Date.now();

    const response = await fetch(url, init);

    return await response.json();
}

async function fetchJsonPaginated(url, { reducer = (page) => page, flatten, onProgress, ...init }) {
    const results = [];
    let nextUrl = url;

    console.log(`URL schema: ${nextUrl}`);

    while (nextUrl) {
        const page = await fetchJson(nextUrl, init);
        const pageResults = reducer(page);

        if (flatten) {
            results.push(...pageResults);
        } else {
            results.push(pageResults);
        }

        if (onProgress) {
            onProgress(results);
        }

        nextUrl = page.links.next;
    }

    return results;
}

function createFieldParams(fields) {
    return Object.entries(fields)
        .map(([ key, values ]) => `fields[${key}]=${values.join()}`)
        .join("&");
}

function sleep(millis) {
    return new Promise((resolve) => setTimeout(resolve, millis));
}

module.exports = {
    baseUrl,
    fetchJson,
    fetchJsonPaginated,
    createFieldParams
};
