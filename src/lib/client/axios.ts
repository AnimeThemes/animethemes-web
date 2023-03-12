import Axios from "axios";
import { AUTH_URL } from "utils/config";

const axios = Axios.create({
    baseURL: AUTH_URL,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
});

export default axios;