import client from "./client";

export const selectFriendList = () => {
    return client.get('/friends', {});
}