/**
 * Created by Mazi on 2018-02-25.
 */

import {all, takeEvery, put} from "redux-saga/effects";
import userFormActionTypes from "../actions/userFormActionTypes"

export function * submitUserFormSaga(action) {
    try {
        console.error('submit user');
    } catch(error) {

    }
}

export function * initUserFormSaga() {
    try {
        const mockUserFormFields = {
                id: {
                    id: 'id',
                    name: 'id',
                    label: 'Id',
                    type: 'text',
                    value: ''
                },
                imie: {
                    id: 'imie',
                    name: 'imie',
                    label: 'Imię',
                    type: 'text',
                    value: ''
                },
                nazwisko: {
                    id: 'nazwisko',
                    name: 'nazwisko',
                    label: 'Nazwisko',
                    type: 'text',
                    value: ''
                },
                dataUrodzenia: {
                    id: 'dataUrodzenia',
                    name: 'dataUrodzenia',
                    label: 'Data urodzenia',
                    type: 'date',
                    value: ''
                }
            };

        yield put({type: userFormActionTypes.INIT_USER_FORM_SUCCESS, payload: mockUserFormFields});
    } catch(error) {
        yield put({type: userFormActionTypes.INIT_USER_FORM_FAILED, error: error});
    }
}

export function* watchUserFormSagas() {
    yield all([
        yield takeEvery(userFormActionTypes.SUBMIT_USER_FORM, submitUserFormSaga),
        yield takeEvery(userFormActionTypes.INIT_USER_FORM, initUserFormSaga)
    ])
}