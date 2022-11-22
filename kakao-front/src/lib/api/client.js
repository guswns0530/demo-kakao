import axios from "axios";
import {API_BASE_URL} from "../../constants";

const option = {
    baseURL: API_BASE_URL,

}
const client = axios.create(option)
client.defaults.withCredentials = true

export default client;