import client from "./client";

export const selectFriendList = () => {
    return client.get('/friends', {});
}
export const selectRecommendFriendList = () => {
    return client.get('/friends/added-me', {});
}
export const selectUserToId = (id) => {
    return client.get('/users/' + id + "/id", {})
}
export const selectUserToEmail = (id) => {
    return client.get('/users/' + id + "/email", {})
}