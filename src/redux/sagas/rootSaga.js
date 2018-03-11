import {all} from "redux-saga/effects";
import {watchUserFormSagas} from "./userFormSagas"
import {watchRecordsSagas} from "./recordsSagas"
import {watchSessionSagas} from "./sessionSagas"
import {watchConnectionManagerSagas} from "./connectionManagerSagas"

export function* rootSaga() {
    yield all([
        watchUserFormSagas(),
        watchRecordsSagas(),
        watchSessionSagas(),
        watchConnectionManagerSagas()
    ])
}
