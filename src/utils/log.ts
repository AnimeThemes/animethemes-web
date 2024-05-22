import pico from "picocolors";

export function error(...message: any) {
    console.error(" " + pico.red(pico.bold("⨯")), ...message);
}

export function warn(...message: any) {
    console.warn(" " + pico.yellow(pico.bold("⚠")), ...message);
}

export function info(...message: any) {
    console.warn(" " + pico.white(pico.bold(" ")), ...message);
}
