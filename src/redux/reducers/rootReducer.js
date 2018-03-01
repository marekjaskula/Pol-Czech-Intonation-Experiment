import {combineReducers} from "redux";
import userFormReducer from "./userFormReducer"
import applicationReducer from "./applicationReducer"
import recordsReducer from "./recordsReducer"


const rootReducer = combineReducers({
    userForm: userFormReducer,
    applicationState: applicationReducer,
    currentRecord: recordsReducer
});

export default rootReducer;
