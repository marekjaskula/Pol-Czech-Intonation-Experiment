/**
 * Created by Mazi on 2018-03-01.
 */

import recordsActionTypes from "../actions/recordsActionTypes";
import {OrderedMap, Map} from 'immutable';
const initialState = {
    list: OrderedMap({}),
    currentRecord: Map({}),
    showRecord: false
}

function recordsReducer(state = initialState, action) {
    switch (action.type) {
        case recordsActionTypes.PREPARE_STAGE_FOR_RECORD_SUCCESS:
            return Object.assign({}, state, action.payload);
        case recordsActionTypes.CHANGE_IMAGE_RECORD: {
            const currentRecord = state.currentRecord;
            return {...state, currentRecord: currentRecord.set('image', action.payload)};
        }
        case recordsActionTypes.CHANGE_AUDIO_RECORD: {
            const currentRecord = state.currentRecord;
            return {...state, currentRecord: currentRecord.set('audio', action.payload)};
        }
        case recordsActionTypes.CHANGE_MEDIA_URL_RECORD: {
            const {recordId, imageUrl, audioUrl} = action.payload;
            let record = state.list.get(recordId);

            if (!record) {
                record = {};
            }
            record.id = recordId;
            record.imageUrl = imageUrl;
            record.audioUrl = audioUrl;

            return {...state, list: state.list.set(recordId, record)};
        }
        case recordsActionTypes.TOGGLE_SHOW_RECORD: {
            return {...state, showRecord: action.payload};
        }
        case recordsActionTypes.SET_CURRENT_RECORD: {
            return {...state, currentRecord: Map(action.payload)};
        }
        case recordsActionTypes.CLEAR_CURRENT_RECORD: {
            return {...state, currentRecord: Map({})};
        }
        case recordsActionTypes.DELETE_RECORD_BY_ID: {
            const recordId = action.payload;
            return {...state, list: state.list.delete(recordId)};
        }
        default:
            return state;
    }
}

export default recordsReducer;
