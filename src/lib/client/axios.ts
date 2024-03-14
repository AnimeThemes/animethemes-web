import type { AxiosError } from "axios";
import Axios from "axios";
import { AUTH_URL } from "utils/config.mjs";

const axios = Axios.create({
    baseURL: AUTH_URL,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
    withXSRFToken: true,
});

export default axios;

export function handleAxiosError(error: AxiosError<{ message?: string }>) {
    if (error.response) {
        // AnimeThemes API returned an error, so we read the error message from the response body
        return error.response.data.message ?? "Unknown API error.";
    }

    // Something bad happened before we could reach the API
    return error.message;
}
