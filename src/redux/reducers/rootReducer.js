import {combineReducers} from "redux";
import userFormReducer from "./userFormReducer"
import applicationReducer from "./applicationReducer"
import recordsReducer from "./recordsReducer"
import sessionReducer from "./sessionReducer"


const rootReducer = combineReducers({
    userForm: userFormReducer,
    applicationState: applicationReducer,
    records: recordsReducer,
    session: sessionReducer
});

export default rootReducer;
