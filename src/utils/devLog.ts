import * as log from "utils/log.mjs";
import { VERBOSE_LOGS } from "./config.mjs";

function info(...message: string[]) {
    logIfDevelopment(log.info, ...message);
}

function warn(...message: string[]) {
    logIfDevelopment(log.warn, ...message);
}

function error(...message: string[]) {
    logIfDevelopment(log.error, ...message);
}

function logIfDevelopment(fn: (...message: string[]) => void, ...message: string[]) {
    if (process.env.NODE_ENV === "development" || VERBOSE_LOGS) {
        fn(...message);
    }
}

const devLog = {
    info,
    warn,
    error,
};

export default devLog;
