import pico from "picocolors";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function error(...message: any) {
    console.error(" " + pico.red(pico.bold("⨯")), ...message);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function warn(...message: any) {
    console.warn(" " + pico.yellow(pico.bold("⚠")), ...message);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function info(...message: any) {
    console.warn(" " + pico.white(pico.bold(" ")), ...message);
}
