import axios from "axios";

export function login(credentials) {
    return axios.post('/api/v1/auth', credentials)
}