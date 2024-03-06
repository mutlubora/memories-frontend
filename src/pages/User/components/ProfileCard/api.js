import http from "@/lib/http";

export function updateUser(id, body) {
    return http.put(`/api/v1/users/${id}`, body);
}

export function deleteAccount(id) {
    return http.delete(`/api/v1/users/${id}`);
}