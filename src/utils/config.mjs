// @ts-check

import pico from "picocolors";
import { error, warn } from "./log.mjs";

// Server-side

const SERVER_API_URL = process.env.ANIMETHEMES_API_URL;
const SERVER_API_KEY = process.env.ANIMETHEMES_API_KEY;

const REVALIDATE_TOKEN = process.env.REVALIDATE_TOKEN;
const ANALYZE = !!process.env.ANALYZE;
const MINIMAL_BUILD = !!process.env.MINIMAL_BUILD;
const AUTH_REFERER = String(process.env.AUTH_REFERER);

// Server-side + Client-side

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const CLIENT_API_URL = process.env.NEXT_PUBLIC_API_URL;
const VIDEO_URL = process.env.NEXT_PUBLIC_VIDEO_URL;
const AUDIO_URL = process.env.NEXT_PUBLIC_AUDIO_URL;
const AUTH_PATH = process.env.NEXT_PUBLIC_AUTH_PATH;

const STAGING = !!process.env.NEXT_PUBLIC_STAGING;
const VERBOSE_LOGS = !!process.env.NEXT_PUBLIC_VERBOSE_LOGS;


function validateConfig() {
    let isValid = true;
    if (!SERVER_API_URL && !CLIENT_API_URL) {
        error(`You need to either specify ${pico.cyan("ANIMETHEMES_API_URL")} or ${pico.cyan("NEXT_PUBLIC_API_URL")} for API requests to work.`);
        isValid = false;
    }
    if (SERVER_API_URL && !CLIENT_API_URL) {
        warn(`It is highly recommended to specify ${pico.cyan("NEXT_PUBLIC_API_URL")}. Otherwise API on the client-side won't work.`);
    }
    if (!VIDEO_URL) {
        warn(`It is recommended to specify ${pico.cyan("NEXT_PUBLIC_VIDEO_URL")}. Otherwise videos won't play.`);
    }
    if (!AUDIO_URL) {
        warn(`It is recommended to specify ${pico.cyan("NEXT_PUBLIC_AUDIO_URL")}. Otherwise audios won't play.`);
    }
    if (!AUTH_PATH) {
        warn(`You haven't specified ${pico.cyan("NEXT_PUBLIC_AUTH_PATH")}. This is fine for development, but should be fixed in production.`);
    }
    return isValid;
}

export {
    SERVER_API_URL,
    SERVER_API_KEY,
    REVALIDATE_TOKEN,
    ANALYZE,
    MINIMAL_BUILD,
    BASE_PATH,
    CLIENT_API_URL,
    VIDEO_URL,
    AUDIO_URL,
    AUTH_PATH,
    STAGING,
    VERBOSE_LOGS,
    AUTH_REFERER,
    validateConfig,
};
