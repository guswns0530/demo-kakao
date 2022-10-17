import axios from "axios";

const option = {
    baseURL: 'http://localhost:8080',
}
const client = axios.create(option)

export const setAuthorization = (data) => { // jwt 설정
    client.defaults.headers.common["Authorization"] = `${data['token_type']} ${data['access_token']}`;
}

export default client;