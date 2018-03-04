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
        case recordsActionTypes.SAVE_RECORD: {
            const currentRecord = state.currentRecord.toJS();
            const id = Date.now();
            const listItem = {id: id, ...currentRecord};
            return {...state, list: state.list.set(id, listItem), showRecord: false};
        }
        case recordsActionTypes.TOGGLE_SHOW_RECORD: {
            return {...state, showRecord: action.payload};
        }
        default:
            return state;
    }
}

export default recordsReducer;
