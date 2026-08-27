import pico from "picocolors";

import { error, warn } from "@/utils/log";

// Server-side

const SERVER_GRAPHQL_URL = process.env.GRAPHQL_URL;

const ANALYZE = !!process.env.ANALYZE;
const MINIMAL_BUILD = !!process.env.MINIMAL_BUILD;

// Server-side + Client-side

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const CLIENT_GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL;
const VIDEO_URL = process.env.NEXT_PUBLIC_VIDEO_URL;
const AUDIO_URL = process.env.NEXT_PUBLIC_AUDIO_URL;

const STAGING = !!process.env.NEXT_PUBLIC_STAGING;
const VERBOSE_LOGS = !!process.env.NEXT_PUBLIC_VERBOSE_LOGS;
const PAGINATION_PAGE_SIZE = process.env.NEXT_PUBLIC_PAGINATION_PAGE_SIZE
    ? Number(process.env.NEXT_PUBLIC_PAGINATION_PAGE_SIZE)
    : 1000;

function validateConfig() {
    let isValid = true;
    if (!SERVER_GRAPHQL_URL && !CLIENT_GRAPHQL_URL) {
        error(
            `You need to either specify ${pico.cyan("GRAPHQL_URL")} or ${pico.cyan("NEXT_PUBLIC_GRAPHQL_URL")} for API requests to work.`,
        );
        isValid = false;
    }
    if (SERVER_GRAPHQL_URL && !CLIENT_GRAPHQL_URL) {
        warn(
            `It is highly recommended to specify ${pico.cyan("NEXT_PUBLIC_GRAPHQL_URL")}. Otherwise API request from the client-side won't work.`,
        );
    }
    if (!VIDEO_URL) {
        warn(`It is recommended to specify ${pico.cyan("NEXT_PUBLIC_VIDEO_URL")}. Otherwise videos won't play.`);
    }
    if (!AUDIO_URL) {
        warn(`It is recommended to specify ${pico.cyan("NEXT_PUBLIC_AUDIO_URL")}. Otherwise audios won't play.`);
    }
    return isValid;
}

export {
    ANALYZE,
    AUDIO_URL,
    BASE_PATH,
    CLIENT_GRAPHQL_URL,
    MINIMAL_BUILD,
    PAGINATION_PAGE_SIZE,
    SERVER_GRAPHQL_URL,
    STAGING,
    validateConfig,
    VERBOSE_LOGS,
    VIDEO_URL,
};
