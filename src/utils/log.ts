import pico from "picocolors";

const fmt = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function error(...message: any) {
    console.error(prefix() + pico.red(pico.bold("⨯")), ...message);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function warn(...message: any) {
    console.warn(prefix() + pico.yellow(pico.bold("⚠")), ...message);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function info(...message: any) {
    console.warn(prefix() + pico.white(pico.bold(" ")), ...message);
}

function prefix() {
    let prefix = `[${timestamp()}] `;
    if (process.env.NEXT_PHASE === "phase-production-build") {
        prefix += `[${process.pid}] `;
    }
    return prefix;
}

function timestamp() {
    const p = Object.fromEntries(fmt.formatToParts(new Date()).map(({ type, value }) => [type, value]));
    return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}:${p.second}`;
}
