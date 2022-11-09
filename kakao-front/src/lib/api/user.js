import client from "./client";

export const selectMe = (token) => {
    if(token) {
        return client.get('/users', {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
    }
    return client.get('/users')
}

export const selectUserToId = (id) => {
    return client.get('/users/' + id + "/id", {})
}

export const selectUserToEmail = (id) => {
    return client.get('/users/' + id + "/email", {})
}

export const update = () => {
    return null;
}

export const remove = () => {
    return null;
}

