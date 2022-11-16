import {QueryClient, setLogger} from "react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            useErrorBoundary: false, suspense: false, retry: false, cacheTime: 0, staleTime: 99999
        },
        mutations: {
            useErrorBoundary: true, retry: false
        },
    },
})
const queryCache = queryClient.getQueryCache()

queryCache.subscribe(event => {
    const error = event?.query?.state?.error
    if (error) {
        const {response: {status}} = error

        if (status === 401) {
        }
    }
})

setLogger({
    error: () => {
    }, log: () => {
    }, warn: () => {
    }
})

export default queryClient