import client from "./client";

export const login = ({ email, password}) => {
    return client.post('/auth/login', {email, password})
}

export const register = ({ email, password, name}) => {
    return client.post('/auth/login', {email, password, name})
}

export const refreshToken = (jwtToken) => {
    return client.post('/auth/refresh', jwtToken)
}