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
        case userFormActionTypes.INIT_USER_FORM_SUCCESS:
            return Object.assign({}, state, {
                data: OrderedMap(action.payload)
            });
        case userFormActionTypes.CHANGE_FIELD_VALUE:
            const {id, value} = action.payload;
            const field = state.data.get(id);
            const newState = state.data.set(id, {...field, value: value});

            return Object.assign({}, state, {data: newState});
        default:
            return state;
    }
}

export default userFormReducer;
