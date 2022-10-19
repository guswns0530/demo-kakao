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

const sagaMiddleware = createSagaMiddleware()

const store = legacy_createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(createStateSyncMiddleware(syncConfig), sagaMiddleware)))
sagaMiddleware.run(rootSaga)
initMessageListener(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
const persist = persistStore(store)

root.render(<React.StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persist}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </PersistGate>
    </Provider>
</React.StrictMode>,);

reportWebVitals();
