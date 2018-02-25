import {combineReducers} from "redux";
import userFormReducer from "./userFormReducer"


const rootReducer = combineReducers({
    userForm: userFormReducer
});

export default rootReducer;
