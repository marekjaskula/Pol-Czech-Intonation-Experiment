import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import { rootSaga } from '../sagas/rootSaga';
import rootReducer from "../reducers/rootReducer"

const composeEnhancers = composeWithDevTools({
    // options like actionSanitizer, stateSanitizer
});

const sagaMiddleware = createSagaMiddleware()
export const store = createStore(
    rootReducer,
    composeEnhancers(
    applyMiddleware(sagaMiddleware)
    )
);

sagaMiddleware.run(rootSaga);
