/**
 * Created by Mazi on 2018-03-01.
 */

import {all, takeEvery, put, select} from "redux-saga/effects";
import recordsActionTypes from "../actions/recordsActionTypes";
import {getRecordById} from "../selectors/recordSelectors"

export function * prepareStageForRecordSaga() {
    try {
        const image = getImageForRecord();
        const nextImage = image.next();
        yield put({type: recordsActionTypes.PREPARE_STAGE_FOR_RECORD_SUCCESS, payload: {image: nextImage.value}});
    } catch(error) {
        yield put({type: recordsActionTypes.PREPARE_STAGE_FOR_RECORD_FAILED, error: error});
    }
}

export function * getImageForRecord() {
    try {

        const mockImages = [
            {
                imageSrc: 'http://www.lens-rumors.com/wp-content/uploads/2015/05/Panasonic-LUMIX-G-Macro-30mm-f2.8-Lens-Sample-Images.jpg'
            },
            {
                imageSrc: 'http://gateslist.de/classifieds/oc-content/uploads/7.jpg'
            },
            {
                imageSrc: 'http://www.paulstravelpictures.com/Canon-S5-IS-Digital-Camera-Review/Canon-S5-IS-Sample-Images-015.jpg'
            }
        ]

        const index = Math.floor((Math.random() * mockImages.length) + 0);
        yield mockImages[index].imageSrc;

    } catch(error) {
        console.error(error);
    }
}

export function * showRecordSaga (action) {
    try {
        const recordId = action.payload;
        const record = yield select(getRecordById, recordId);

        yield put({type: recordsActionTypes.SET_CURRENT_RECORD, payload: record});
        yield put({type: recordsActionTypes.TOGGLE_SHOW_RECORD, payload: true});
    } catch(error) {
        console.error(error);
    }
}

export function* watchRecordsSagas() {
    yield all([
        yield takeEvery(recordsActionTypes.PREPARE_STAGE_FOR_RECORD, prepareStageForRecordSaga),
        yield takeEvery(recordsActionTypes.SHOW_RECORD_BY_ID, showRecordSaga)
    ])
}