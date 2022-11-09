import client from "./client";

export const selectFriendList = () => {
    return client.get('/friends', {});
}
export const selectRecommendFriendList = () => {
    return client.get('/friends/added-me', {});
}

export const insertFriendToId = (id) => {
    return client.post('/friends/?option=id', {id})
}

export const insertFriendToEmail = (email) => {
    return client.post('/friends?option=email', {id: email})
}