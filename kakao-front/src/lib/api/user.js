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

export const select = () => {
    return null;
}

export const update = () => {
    return null;
}

export const remove = () => {
    return null;
}

