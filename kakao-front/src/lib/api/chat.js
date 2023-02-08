import client from "./client";

export const selectChatList = (roomId, id) => {
    if(!id) {
        return client.get("/chats/" + roomId + "/load")
    }
    return client.get("/chats/" + roomId + "/load/" + id)
}

export const insertChatText = (roomId, content) => {
    return client.post("/chats", {
        'room_id': roomId,
        content
    })
}

export const readChat = (roomId) => {
    return client.post("/chats/" + roomId + "/read")
}

export const removeChat = (roomId, chatId) => {
    return client.delete(`/chats/${roomId}/${chatId}`)
}