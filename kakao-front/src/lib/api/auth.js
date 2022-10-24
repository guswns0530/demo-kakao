import client from "./client";

export const login = ({ email, password}) => {
    return client.post('/auth/login', {email, password})
}

export const register = ({ email, password, name}) => {
    return client.post('/auth/login', {email, password, name})
}

export const getEmailVerify = (email) => {
    return client.get('/auth/'+email)
}

export const checkEmailVerify = (verifyCode) => {
    return client.post("/auth/email-confirm", verifyCode)
}

export const refreshToken = (jwtToken) => {
    return client.post('/auth/refresh', jwtToken)
}