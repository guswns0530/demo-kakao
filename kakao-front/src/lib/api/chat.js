import client from "./client";

export const selectChatList = (roomId, id) => {
    if(!id) {
        return client.get("/chats/" + roomId + "/load")
    }
    return client.get("/chats/" + roomId + "/load/" + id)
}