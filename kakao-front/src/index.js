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
import {QueryClientProvider} from "react-query";
import {ToastContainer} from "react-toastify";
import queryClient from "./services/queryClient";

import LayerPopupContainer from "./containers/util/LayerPopupContainer";

import "react-toastify/dist/ReactToastify.css"
import "./css/ReactContexify.css"

import initProperty from "./services/initProperty";

const sagaMiddleware = createSagaMiddleware()

const store = legacy_createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(createStateSyncMiddleware(syncConfig), sagaMiddleware)))

sagaMiddleware.run(rootSaga)
initMessageListener(store)
initProperty()

const persist = persistStore(store)
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <PersistGate loading={<NotFoundPage/>} persistor={persist}>
                <QueryClientProvider client={queryClient}>
                    <ToastContainer position={"top-right"}/>
                    <LayerPopupContainer/>
                    <App/>
                </QueryClientProvider>
            </PersistGate>
        </BrowserRouter>
    </Provider>
);

setUpInterceptors(store)
reportWebVitals();


