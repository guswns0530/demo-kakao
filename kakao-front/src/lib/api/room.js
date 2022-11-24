import client from "./client";

export const inviteOrCreateRoom = (data) => {
    return client.post("/rooms", data)
}

export const selectRoom = (id) => {
    return client.get('/rooms/' + id)
}

export const selectRoomList = () => {
    return client.get('/rooms');
}

export const selectReaderChat = (id) => {
    return client.get("/rooms/reader/" + id)
}

export const leaveRoom = (id) => {
    return client.delete('/rooms/'+id)
}

export const updateRoom = (id, roomName) => {
    return client.put('/rooms/' + id, {roomName})
}