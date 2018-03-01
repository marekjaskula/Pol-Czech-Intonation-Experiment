/**
 * Created by Mazi on 2018-03-01.
 */

import recordsActionTypes from "../actions/recordsActionTypes"
const initialState = {
    image: ''
}

function recordsReducer(state = initialState, action) {
    switch (action.type) {
        case recordsActionTypes.PREPARE_STAGE_FOR_RECORD_SUCCESS:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}

export default recordsReducer;
