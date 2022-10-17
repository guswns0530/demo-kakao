import client from "./client";

export const selectMe = () => {
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

