import client from "./client";

export const selectRoom = (id) => {
    return client.get('/rooms/' + id)
}

export const selectRoomList = () => {
    return client.get('/rooms');
}