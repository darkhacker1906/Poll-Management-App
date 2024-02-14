import { createSlice } from "@reduxjs/toolkit";
import Instance from "../../axios/BaseUrl";
const initialState = {
  loading: false,
  isError: false,
  isSuccess: false,
  data: {},
};
export const signIn = createSlice({
  name: "signIn",
  initialState: initialState,
  reducers: {
    startLoading: (state) => {
      (state.loading = true), (state.isError = false);
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
    loginResetReducer(state) {
      console.log("ggggggggg");
      state.isError = false;
      state.loading = false;
      state.isSuccess = false;
      state.data = {};
    },
  },
});

export const signInApi = (payload) => async (dispatch) => {
  dispatch(startLoading());
  try {
    let response = await Instance.post(
      `login?username=${payload.username}&password=${payload.password}`
    );
// if(response.data.error==1){
//   dispatch(hasError());
// }
// else{
  dispatch(loginSuccessful(response.data));
// }

  } catch (error) {
    dispatch(hasError(error));
  }
};
export const { startLoading, hasError, loginSuccessful, loginResetReducer } =
  signIn.actions;
export default signIn.reducer;
