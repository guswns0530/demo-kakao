import client from "../lib/api/client";
import {refreshToken} from "../lib/api/auth";
import {setAccessToken} from "../modules/auth";


const setup = (store) => {
    const {dispatch} = store

    client.interceptors.request.use(
        (config) => {
            const state = store.getState()

            if (!state.auth.auth) {
                return config;
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
                if (err.response.status === 401 && err.response) {
                    originalConfig._retry = true;

                    try {
                        if (!state.auth.auth) {
                            return Promise.reject(err)
                        }
                        const token = state.auth.auth.access_token;
                        const rs = await refreshToken(token)
                        const {access_token} = rs.data.data

                        dispatch(setAccessToken(access_token))

                        return client(originalConfig)
                    } catch (_err) {
                        return Promise.reject(_err)
                    }
                }
            }

            return Promise.reject(err)
        })

}


export default setup