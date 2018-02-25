import {all} from "redux-saga/effects";
import {watchSetupApplicationSaga} from "./setupSaga"

export function* rootSaga() {
    yield all([
        watchSetupApplicationSaga()
    ])
}
