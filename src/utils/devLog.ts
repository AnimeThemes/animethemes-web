import * as log from "next/dist/build/output/log";

function info(...message: string[]) {
    logIfDevelopment(log.event, ...message);
}

function warn(...message: string[]) {
    logIfDevelopment(log.warn, ...message);
}

function error(...message: string[]) {
    logIfDevelopment(log.error, ...message);
}

function logIfDevelopment(fn: (...message: string[]) => void, ...message: string[]) {
    if (process.env.NODE_ENV === "development") {
        fn(...message);
    }
}

const devLog = {
    info,
    warn,
    error,
};

export default devLog;
