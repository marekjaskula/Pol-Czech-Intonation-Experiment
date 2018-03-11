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
        case recordsActionTypes.SAVE_RECORD: {
            const currentRecord = state.currentRecord.toJS();
            const id = Date.now();
            const listItem = {id: id, ...currentRecord};
            const currentRecordMap = state.currentRecord;
            return {...state, list: state.list.set(id, listItem), showRecord: false, currentRecord: currentRecordMap.set('id', id)};
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
