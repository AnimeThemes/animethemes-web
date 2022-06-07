import { BASE_PATH } from "utils/config";

export default function withBasePath(path) {
    return `${BASE_PATH}${path}`;
}
