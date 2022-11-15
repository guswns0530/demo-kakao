import client from "./client";

export const selectRoomList = () => {
    return client.get('/rooms');
}