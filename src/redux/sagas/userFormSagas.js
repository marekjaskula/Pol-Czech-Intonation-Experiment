/**
 * Created by Mazi on 2018-02-25.
 */

import {all, takeEvery, put} from "redux-saga/effects";
import userFormActionTypes from "../actions/userFormActionTypes"

export function * submitUserFormSaga(action) {
    try {
        console.error('submit user into be');
        yield put({type: userFormActionTypes.SUBMIT_USER_FORM_SUCCESS, payload: action.payload});
    } catch(error) {
        yield put({type: userFormActionTypes.SUBMIT_USER_FORM_FAILED, error: error});
    }
}

export function* watchUserFormSagas() {
    yield all([
        yield takeEvery(userFormActionTypes.SUBMIT_USER_FORM, submitUserFormSaga)
    ])
}