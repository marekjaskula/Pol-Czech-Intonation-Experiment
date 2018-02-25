import {all} from "redux-saga/effects";
import {watchUserFormSagas} from "./userFormSagas"

export function* rootSaga() {
    yield all([
        watchUserFormSagas()
    ])
}
