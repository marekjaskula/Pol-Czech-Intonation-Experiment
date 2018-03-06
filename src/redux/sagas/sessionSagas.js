/**
 * Created by Mazi on 2018-03-06.
 */

import {all, takeEvery, put, select} from "redux-saga/effects";
import sessionActionTypes from "../actions/sessionActionTypes"
import {getAllRecords, getRecordById} from "../selectors/recordSelectors"

export function * sessionStartSaga() {
    try {
        const recordsList = yield select(getAllRecords);

        if (recordsList.size < 1) {
            yield put({type: sessionActionTypes.SESSION_START_FAILED, error: "Brak nagrań"})
        } else {
            const recordIds = recordsList.keySeq().toArray();
            const iterator = recordIds[Symbol.iterator]();

            const currentRecord = yield select(getRecordById, iterator.next().value);

            yield put({type: sessionActionTypes.SESSION_START_SUCCESS, payload: {
                recordIds: recordIds,
                currentRecord: currentRecord,
                iterator: iterator
            }})
        }
    } catch(error) {
        console.error(error);
        yield put({type: sessionActionTypes.SESSION_START_FAILED, error: "Błąd podczas startu"})
    }
}

export function * watchSessionSagas() {
    yield all([
        yield takeEvery(sessionActionTypes.SESSION_START, sessionStartSaga)
    ])
}
