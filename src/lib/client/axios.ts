import type { AxiosError } from "axios";
import Axios from "axios";

import { CLIENT_API_URL } from "@/utils/config";

const axios = Axios.create({
    baseURL: CLIENT_API_URL,
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
