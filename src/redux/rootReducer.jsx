import { combineReducers } from "redux";
import SignUpSlice from "./slice/SignUpSlice";
import SignInSlice from "./slice/SignInSlice";
import AddPollSlice from "./slice/AddPollSlice";
import AdminPollSlice from "./slice/AdminPollSlice";

const rootReducer=combineReducers({
    signup:SignUpSlice,
    signin:SignInSlice,
    addPoll:AddPollSlice,
    adminPoll:AdminPollSlice,
})
export default rootReducer