import client from "../lib/api/client";
import {setAccessToken} from "../modules/auth";
import {refreshToken} from "../lib/api/auth";

const bannedUrl = ["/auth/login", "/auth/refresh"]
let isTokenRefreshing = false;
let refreshSubscribers = [];

const onTokenRefreshed = (accessToken) => {
    refreshSubscribers.map((callback) => callback(accessToken))
    refreshSubscribers = []
}

const addRefreshSubscriber = (callback) => {
    refreshSubscribers.push(callback)
}

export const initRefreshSubscriber = () => {
    isTokenRefreshing = false;
    refreshSubscribers = []
}


const setup = (store) => {
    const {dispatch} = store

    client.interceptors.request.use((config) => {
        const state = store.getState()

        if (!state.auth.auth) {
            return config;
        }

        const token = state.auth.auth.access_token

        if (token) {
            if (!config.headers["Authorization"]) {
                const accessToken = "Bearer " + token;
                config.headers["Authorization"] = accessToken
            }
        }

        return config;
    }, (error) => {
        return Promise.reject(error)
    })

    client.interceptors.response.use((res) => {
            return res;
        },

        async (err) => {
            const originalConfig = err.config
            const state = store.getState()

            if (!originalConfig) {
                return Promise.reject(err)
            }

            if (bannedUrl.indexOf(originalConfig.url) < 0 && err.response) {
                if (err.response && err.response.status === 401) {
                    try {
                        if (!state.auth.auth) {
                            return Promise.reject(err)
                        }

                        const retryOriginalRequest = new Promise((resolve, reject) => {
                            addRefreshSubscriber((accessToken) => {
                                const token = "Bearer " + accessToken;

                                originalConfig.headers = {...originalConfig.headers}
                                originalConfig.headers["Authorization"] = token

                                resolve(client(originalConfig))
                            });
                        });

                        if (!isTokenRefreshing) {
                            isTokenRefreshing = true;

                            const token = state.auth.auth.access_token
                            const rs = await refreshToken(token)
                            const {access_token} = rs.data.data

                            dispatch(setAccessToken(access_token))

                            isTokenRefreshing = false;


                            onTokenRefreshed(access_token)
                        }

                        return retryOriginalRequest;
                    } catch (_err) {
                        if(_err.response.config.url === bannedUrl[1]) {
                            initRefreshSubscriber()
                        }
                        return Promise.reject(_err)
                    }
                }
            }
            if(err.response.config.url === bannedUrl[1]) {
                initRefreshSubscriber()
            }
            return Promise.reject(err)
        })
}


export default setup