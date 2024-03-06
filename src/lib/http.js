import { loadToken, storeToken } from "@/shared/state/storage";
import axios from "axios";

const http = axios.create();

let authToken = loadToken();

export function setToken(token) {
    authToken = token;
    storeToken(token);
}

http.interceptors.request.use((config) => {
    if (authToken) {
        config.headers['Authorization'] = `${authToken.prefix} ${authToken.token}`;
    }
    return config;
})

export default http;