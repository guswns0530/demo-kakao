import {QueryClient, setLogger} from "react-query";
import {toast} from "react-toastify";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            useErrorBoundary: true,
            suspense: true,
            retry: false,
            cacheTime: 99999,
            staleTime: 99999,
            onError: (err) => {
                if (err?.response?.config?.url === '/auth/refresh') {
                    const {response: {data: {error_description: info}}} = err
                    toast.error(info)
                }
            },
        },
        mutations: {
            useErrorBoundary: true,
            retry: false
        },
    }
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
    },
    log: () => {
    },
    warn: () => {
    }
})

export default queryClient