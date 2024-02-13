import { createSlice } from "@reduxjs/toolkit";
import Instance from "../../axios/BaseUrl";
const initialState = {
  loading: false,
  isError: false,
  isSuccess: false,
  data: {},
};
export const signUp = createSlice({
  name: "signUp",
  initialState: initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.isError = false;
    },
    loginSuccessful: (state, action) => {
      state.loading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = { ...action.payload };
    },
    hasError: (state, action) => {
      state.loading = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = action.payload;
    },
    signupResetReducer(state) {
      state.isError = false;
      state.loading = false;
      state.isSuccess = false;
      state.data = {};
    },
  },
});;
export const signUpapi = (payload) => async (dispatch) => {
  // console.log(payload);
  try {
    let response = await Instance.post(
      `add_user?username=${payload.name}& password=${payload.password}& role=${payload.role}`
    );
    // console.log(response);
    dispatch(loginSuccessful(response.data));
  } catch (error) {
    dispatch(hasError(error));
    console.log(e, "gggggg");
  }
};
export const {startLoading,hasError,loginSuccessful,signupResetReducer}=signUp.actions;
export default signUp.reducer
