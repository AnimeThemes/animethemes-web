// @ts-check

import pico from "picocolors";

/**
 * @param {...any} message
 */
export function error(...message) {
    console.error(" " + pico.red(pico.bold("⨯")), ...message);
}

/**
 * @param {...any} message
 */
export function warn(...message) {
    console.warn(" " + pico.yellow(pico.bold("⚠")), ...message);
}

/**
 * @param {...any} message
 */
export function info(...message) {
    console.warn(" " + pico.white(pico.bold(" ")), ...message);
}
