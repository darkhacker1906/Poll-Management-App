import { createSlice } from "@reduxjs/toolkit";
import Instance from "../../axios/BaseUrl";
const initialState = {
  loading: false,
  isError: false,
  isSuccess: false,
  data: {},
};
export const addPoll = createSlice({
  name: "addPoll",
  initialState: initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.isError = false;
    },
    addPollSuccessful: (state, action) => {
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
    addPollResetReducer(state) {
      state.isError = false;
      state.loading = false;
      state.isSuccess = false;
      state.data = {};
    },
  },
});
export const addPollApi = (payload) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const optionsString = Object.values(payload)
      .filter((value) => value !== payload.title)
      .join(",");
      console.log(optionsString);
    let response = await Instance.post(
      `add_poll?title=${payload.title}&options=${optionsString}`
    );
    console.log(response);
    // if (response.data.error === 0) {
      dispatch(addPoll.actions.addPollSuccessful(response.data));
    // }
  } catch (error) {
    console.log(error.message);
  }
};
export const {
  startLoading,
  hasError,
  addPollSuccessful,
  addPollResetReducer,
} = addPoll.actions;
export default addPoll.reducer;
