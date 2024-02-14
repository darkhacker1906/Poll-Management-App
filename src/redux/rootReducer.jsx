import { combineReducers } from "redux";
import SignUpSlice from "./slice/SignUpSlice";
import SignInSlice from "./slice/SignInSlice";

const rootReducer=combineReducers({
    signup:SignUpSlice,
    signin:SignInSlice,
})
export default rootReducer