import {all} from "redux-saga/effects";
import {watchUserFormSagas} from "./userFormSagas"
import {watchRecordsSagas} from "./recordsSagas"

export function* rootSaga() {
    yield all([
        watchUserFormSagas(),
        watchRecordsSagas()
    ])
}
