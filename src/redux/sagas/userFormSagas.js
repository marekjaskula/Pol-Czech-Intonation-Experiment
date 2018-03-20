/**
 * Created by Mazi on 2018-02-25.
 */

import {all, takeEvery, put} from "redux-saga/effects";
import {Parser} from 'json2csv';

import userFormActionTypes from "../actions/userFormActionTypes";
import applicationActionTypes from "../actions/applicationActionTypes";
import {APPLICATION_STATE} from "../../App";
import ConnectionManager from "../../components/ConnectionManager/ConnectionManager"

export function * submitUserFormSaga(action) {
    try {

        const userForm = action.payload;
        const fields = Object.keys(userForm);

        const json2csvParser = new Parser({fields});
        const csv = json2csvParser.parse(userForm);
        const fileName = `${userForm.id}${userForm.imie}${userForm.nazwisko}_${userForm.dataUrodzenia}`;
      // var newNameFolder = FileName;

        const bundle = {
            command: ConnectionManager.COMMAND.CSV,
            payload: {
                filename: encodeURIComponent(fileName),
                nameFolder: encodeURIComponent(fileName),
                data: {
                    id: encodeURIComponent(userForm.id),
                    FileName: encodeURIComponent(fileName),
                    Imie: encodeURIComponent(userForm.imie),
                    Nazwisko: encodeURIComponent(userForm.nazwisko),
                    Year: encodeURIComponent(userForm.dataUrodzenia),
                    age: encodeURIComponent(userForm.dataUrodzenia),
                    sex: encodeURIComponent(''),
                    Klasa: encodeURIComponent(''),
                    Szkola: encodeURIComponent('')
                }
            }
        }

        ConnectionManager.sendBundle(bundle);

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