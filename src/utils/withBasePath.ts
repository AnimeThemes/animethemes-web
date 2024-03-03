import { BASE_PATH } from "utils/config.mjs";

export default function withBasePath(path: string) {
    return `${BASE_PATH}${path}`;
}
