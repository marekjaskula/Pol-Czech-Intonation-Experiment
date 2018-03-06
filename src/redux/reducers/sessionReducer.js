/**
 * Created by Mazi on 2018-03-06.
 */

import sessionActionTypes from "../actions/sessionActionTypes"
import {OrderedMap, Map} from 'immutable';

const initialState = {
    status: sessionActionTypes.SESSION_STOP,
    currentRecord: Map({}),
    recordIds: [],
    raport: OrderedMap({}),
    error: '',
    iterator: null
};

function sessionReducer(state = initialState, action) {
    switch(action.type) {
        case sessionActionTypes.SESSION_START:
        case sessionActionTypes.SESSION_STOP:
        case sessionActionTypes.SESSION_PAUSE:
            return {...state, status: action.type, error: ''};
        case sessionActionTypes.SESSION_NEXT_RECORD_SUCCESS:
            return {...state, currentRecord: Map(action.payload), error: ''};
        case sessionActionTypes.SESSION_START_SUCCESS:
            const {recordIds, currentRecord, iterator} = action.payload;
            return {...state, currentRecord: Map(currentRecord), recordIds: recordIds, iterator: iterator};
        case sessionActionTypes.SESSION_START_FAILED:
        case sessionActionTypes.SESSION_FAILED:
        case sessionActionTypes.SESSION_NEXT_RECORD_FAILED:
            return {...state, error: action.error, status: action.type};
        default:
            return state;
    }
}

export default sessionReducer;
