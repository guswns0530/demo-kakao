import axios from "axios";
import {API_BASE_URL} from "../../constants";

const option = {
    baseURL: API_BASE_URL,
}
const client = axios.create(option)

export const setAuthorization = (data = {'token_type': 'Bearer', 'access_token': ''}) => { // jwt 설정
    client.defaults.headers.common["Authorization"] = `${data['token_type']} ${data['access_token']}`;
}

export default client;