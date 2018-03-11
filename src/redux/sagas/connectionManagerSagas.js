/**
 * Created by Mazi on 2018-03-11.
 */

import {all, takeEvery, put, select} from "redux-saga/effects";
import connectionManagerActionTypes from "../actions/connectionManagerActionTypes";

import {store} from '../store/store';
import ConnectionManager from "../../components/ConnectionManager/ConnectionManager"

export function * initConnectionSaga() {
    try {
        ConnectionManager.init(store);

    } catch(error) {
        console.error(error);
    }
}

export function * watchConnectionManagerSagas() {
    yield all([
        yield takeEvery(connectionManagerActionTypes.INIT_CONNECTION, initConnectionSaga)
    ])

}