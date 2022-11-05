import client from "../lib/api/client";
import {refreshToken} from "../lib/api/auth";
import {SET_ACCESS_TOKEN, setAccessToken} from "../modules/auth";

const setup = (store) => {
    const {dispatch} = store

    client.interceptors.request.use(
        (config) => {
            const state = store.getState()
            const {loading} = state

            if (!state.auth.auth) {
                return config;
            }

            if(config.headers["Authorization"]) {
                return config
            }

            const token = state.auth.auth.access_token

            if (token) {
                if(!config.headers["Authorization"]) {
                    const accessToken = "Bearer " + token;
                    config.headers["Authorization"] = accessToken
                }
            }

            return config;
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    client.interceptors.response.use((res) => {
            return res;
        },

        async (err) => {
            const state = store.getState()
            const originalConfig = err.config


            if (!originalConfig) {
                return Promise.reject(err)
            }

            if (originalConfig.url !== "/auth/login" && err.response) {
                if (err.response && err.response.status === 401) {

                    originalConfig._retry = true;

                    try {
                        if (!state.auth.auth) {
                            return Promise.reject(err)
                        }

                        const token = state.auth.auth.access_token;
                        const rs = await refreshToken(token)

                        const {access_token} = rs.data.data

                        dispatch(setAccessToken(access_token))

                        const {method, url} = originalConfig

                        return client[method](url, originalConfig.data)
                    } catch (_err) {
                        return Promise.reject(_err)
                    }
                }
            }

            return Promise.reject(err)
        })

}


export default setup