import { VERBOSE_LOGS } from "@/utils/config";
import * as log from "@/utils/log";

function info(...message: Array<string>) {
    logIfDevelopment(log.info, ...message);
}

function warn(...message: Array<string>) {
    logIfDevelopment(log.warn, ...message);
}

function error(...message: Array<string>) {
    logIfDevelopment(log.error, ...message);
}

function logIfDevelopment(fn: (...message: Array<string>) => void, ...message: Array<string>) {
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
