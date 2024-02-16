import { combineReducers } from "redux";
import SignUpSlice from "./slice/SignUpSlice";
import SignInSlice from "./slice/SignInSlice";
import AddPollSlice from "./slice/AddPollSlice";

const rootReducer=combineReducers({
    signup:SignUpSlice,
    signin:SignInSlice,
    addPoll:AddPollSlice
})
export default rootReducer