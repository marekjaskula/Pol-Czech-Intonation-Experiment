/**
 * Created by Mazi on 2018-03-01.
 */

import {APPLICATION_STATE as APPLCATION_STATE} from "../../App"

const initialState = 'USER_FORM';

function applicationReducer(state = initialState, action) {
    return Object.keys(APPLCATION_STATE).includes(action.payload) ? action.payload : state;
}

export default applicationReducer;
