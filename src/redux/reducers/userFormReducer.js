/**
 * Created by Mazi on 2018-02-25.
 */

import userFormActionTypes from "../actions/userFormActionTypes";
import {OrderedMap} from 'immutable';

const initialState = {
    data: OrderedMap({}),
    errors: OrderedMap({}),
    isSubmitting: false
}

function userFormReducer(state = initialState, action) {
    switch (action.type) {
        case userFormActionTypes.SUBMIT_USER_FORM_SUCCESS:
            return Object.assign({}, state, {
                data: OrderedMap(action.payload)
            });
        default:
            return state;
    }
}

export default userFormReducer;
