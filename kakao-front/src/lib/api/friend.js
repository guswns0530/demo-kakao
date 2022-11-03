import client from "./client";

export const selectFriendList = () => {
    return client.get('/friends', {});
}
export const selectRecommendFriendList = () => {
    return client.get('/friends/added-me', {});
}
export const selectUser = (id) => {
    return client.get('/users/' + id, {})
}
