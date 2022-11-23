import client from "./client";

export const selectFriendList = () => {
    return client.get('/friends', {});
}

export const selectRecommendFriendList = () => {
    return client.get('/friends/added-me', {});
}

export const selectBlockFriendList = () => {
    return client.get("/friends/block-list")
}

export const insertFriendToId = (id) => {
    return client.post('/friends/?option=id', {id})
}

export const insertFriendToEmail = (email) => {
    return client.post('/friends?option=email', {id: email})
}

export const blockFriendToEmail = (email) => {
    return client.delete(`/friends/${email}/block`)
}

export const updateFriendName = (email, name) => {
    return client.put(`/friends/${email}`, {
        nickname: name
    })
}

