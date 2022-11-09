import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

// React-router-dom
import {BrowserRouter} from '../node_modules/react-router-dom/dist/index';

//redux
import {Provider} from 'react-redux';
import {applyMiddleware, legacy_createStore} from 'redux';
import rootReducer from './modules/index';
import {composeWithDevTools} from 'redux-devtools-extension';
import {rootSaga} from "./modules/index";
import createSagaMiddleware from 'redux-saga'

// sync
import {syncConfig} from "./modules/index";
import {createStateSyncMiddleware, initMessageListener} from "redux-state-sync/dist/syncState";
import {persistStore} from "redux-persist";
import {PersistGate} from "redux-persist/integration/react";
import setUpInterceptors from "./services/setUpInterceptors";
import NotFoundPage from "./pages/NotFoundPage";

// queryClient
import {QueryClient, QueryClientProvider, setLogger} from "react-query";

const sagaMiddleware = createSagaMiddleware()

const store = legacy_createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(createStateSyncMiddleware(syncConfig), sagaMiddleware)))
sagaMiddleware.run(rootSaga)
initMessageListener(store)

const persist = persistStore(store)
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            useErrorBoundary: true,
            suspense: true,
            retry: 0,
            cacheTime: 0,
        },
        mutations: {
            useErrorBoundary: true,
        },
    }
})
setLogger({
    error: () => {},
    log: () => {},
    warn: () => {}
})

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <PersistGate loading={<NotFoundPage/>} persistor={persist}>
                <QueryClientProvider client={queryClient}>
                    <App/>
                </QueryClientProvider>
            </PersistGate>
        </BrowserRouter>
    </Provider>
</React.StrictMode>,);

setUpInterceptors(store)
reportWebVitals();
