/**
 * Created by Mazi on 2018-02-25.
 */

import {all, takeEvery, put} from "redux-saga/effects";
import userFormActionTypes from "../actions/userFormActionTypes"
import applicationActionTypes from "../actions/applicationActionTypes"
import {APPLICATION_STATE} from "../../App"

export function * submitUserFormSaga(action) {
    try {
        console.error('submit user into be');
        yield put({type: userFormActionTypes.SUBMIT_USER_FORM_SUCCESS, payload: action.payload});

        yield put({type: applicationActionTypes.CHANGE_APPLICATION_STATE, payload: APPLICATION_STATE.RECORDS})
    } catch(error) {
        yield put({type: userFormActionTypes.SUBMIT_USER_FORM_FAILED, error: error});
    }
}

export function* watchUserFormSagas() {
    yield all([
        yield takeEvery(userFormActionTypes.SUBMIT_USER_FORM, submitUserFormSaga)
    ])
}