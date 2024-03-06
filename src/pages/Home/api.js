import http from "@/lib/http";

export function postMemory(body) {
    return http.post('/api/v1/memories', body);
}
export function postMemoryAttachment(attachment ){
    return http.post('/api/v1/memory-attachments', attachment);
}

export function getMemories(page=0) {
    return http.get(`/api/v1/memories?page=${page}`);
}

export function getOldMemories(id) {
    return http.get(`/api/v1/memories/${id}`);
}

export function getMemoriesOfUser(id,page=0) {
    return http.get(`/api/v1/users/${id}/memories?page=${page}`);
}

export function getOldMemoriesOfUser(userId, memoryId) {
    return http.get(`/api/v1/users/${userId}/memories/${memoryId}`);
}

export function getNewMemoriesCount(id) {
    return http.get(`/api/v1/memories/${id}?count=true`)
}

export function getNewMemoriesCountOfUser(userId, memoryId) {
    return http.get(`/api/v1/users/${userId}/memories/${memoryId}?count=true`)
}


export function getNewMemories(id) {
    return http.get(`/api/v1/memories/${id}?direction=after`)
}

export function getNewMemoriesOfUser(userId, memoryId) {
    return http.get(`/api/v1/users/${userId}/memories/${memoryId}?direction=after`)
}

export function deleteMemory(id) {
    return http.delete(`/api/v1/memories/${id}`)
}
