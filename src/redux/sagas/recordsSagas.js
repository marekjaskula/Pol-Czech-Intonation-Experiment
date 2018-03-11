/**
 * Created by Mazi on 2018-03-01.
 */

import {all, takeEvery, put, select} from "redux-saga/effects";
import recordsActionTypes from "../actions/recordsActionTypes";
import {getCurrentRecord, getRecordById} from "../selectors/recordSelectors"
import blobToBase64 from '../../helpers/audioBlobHelper';
import ConnectionManager from "../../components/ConnectionManager/ConnectionManager"

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

export function * saveRecordSaga() {
    try {
        const currentRecord = yield select(getCurrentRecord);
        const audio = currentRecord.get('audio');
        const payload = {
            id: currentRecord.get('id'),
            imageBlob: currentRecord.get('image'),
            audioBlob: ''
        }

        const getAudioBase64Content = (result) => {
            const bundle = {
                command: 'upload_record',
                payload: {
                    id: payload.id,
                    image: {
                        fileName: `image_${payload.id}`,
                        data: payload.imageBlob
                    },
                    audio: {
                        fileName: `audio_${payload.id}`,
                        data: result
                    }
                }
            };

            ConnectionManager.sendBundle(bundle);
        }

        blobToBase64(audio.blob, getAudioBase64Content)

    } catch(error) {
        console.error(error);
    }
}

export function* watchRecordsSagas() {
    yield all([
        yield takeEvery(recordsActionTypes.PREPARE_STAGE_FOR_RECORD, prepareStageForRecordSaga),
        yield takeEvery(recordsActionTypes.SHOW_RECORD_BY_ID, showRecordSaga),
        yield takeEvery(recordsActionTypes.SAVE_RECORD, saveRecordSaga)
    ])
}