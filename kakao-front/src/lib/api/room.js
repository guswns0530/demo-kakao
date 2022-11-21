import client from "./client";

export const selectRoom = (id) => {
    return client.get('/rooms/' + id)
}

export const selectRoomList = () => {
    return client.get('/rooms');
}

export const selectReaderChat = (id) => {
    return client.get("/rooms/reader/" + id)
}