import client from "../lib/api/client";
import {refreshToken} from "../lib/api/auth";
import {accessToken} from "../modules/auth";

const setup = (store) => {
    const {dispatch} = store

    client.interceptors.request.use(
        (config) => {
            const state = store.getState()

            if(!state.auth.auth) {
                return config;
            }

            const token = state.auth.auth.access_token

            if(token) {
                config.headers["Authorization"] = "Bearer " + token;
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
            let number = Math.random();
            console.log('start-error', number)
            console.log(err)

            const state = store.getState()
            const originalConfig = err.config

            if(!originalConfig) {
                return Promise.reject(err)
            }

            if(originalConfig.url !== "/auth/login" && err.response) {
                if(err.response.status === 401 && err.response) {
                    originalConfig._retry = true;

                    try {
                        if(!state.auth.auth) {
                            return Promise.reject(err)
                        }
                        const token = state.auth.auth.access_token;
                        const rs = await refreshToken(token)
                        const { access_token } = rs.data.data

                        console.log(`refresh token: ${access_token}`)

                        dispatch(accessToken(access_token))

                        return client(originalConfig)
                    } catch (_err) {
                        return Promise.reject(_err)
                    }
                }
            }

            return Promise.reject(err)

            console.log('end-error', number)
        })

}


export default setup