import { combineReducers } from "redux";
import SignUpSlice from "./slice/SignUpSlice";

const rootReducer=combineReducers({
    signup:SignUpSlice,

})
export default rootReducer