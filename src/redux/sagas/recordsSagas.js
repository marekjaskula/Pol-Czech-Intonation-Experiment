/**
 * Created by Mazi on 2018-03-01.
 */

import {all, takeEvery, put} from "redux-saga/effects";
import recordsActionTypes from "../actions/recordsActionTypes";

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

export function* watchRecordsSagas() {
    yield all([
        yield takeEvery(recordsActionTypes.PREPARE_STAGE_FOR_RECORD, prepareStageForRecordSaga)
    ])
}