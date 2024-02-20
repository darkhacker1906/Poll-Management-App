import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store/store";
import Instance from "../../axios/BaseUrl";

const initialState = {
  loading: false,
  isError: false,
  isSuccess: false,
  data: [],
};

const userVote = createSlice({
  name: "userVote",
  initialState: initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.isError = false;
    },
    voteSuccessful: (state, action) => {
      state.loading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = { ...action.payload };
    },
    hasError: (state, action) => {
      state.loading = false;
      state.isError = true;
      state.isSuccess = false;
      state.data = action.payload;
    },
    resetReducer(state) {
      state.isError = false;
      state.loading = false;
      state.isSuccess = false;
      state.data = [];
    },
  },
});

export async function userVoteApi(payload) {
const {id,option,header}=payload;
console.log(payload);
  try {
    dispatch(startLoading());
    let response = await Instance.get(
        `do_vote?id=${id}&option_text=${option}`,
        header
      );
    console.log(response);
    if(response.data.error === 0){
        dispatch(voteSuccessful(response.data));
    }
    else{
        dispatch(hasError(response.data));
    }
  } catch (e) {
    dispatch(hasError(e));
    console.log(e, "sdffsf");
  }
}

export const { startLoading, getSuccess, voteSuccessful, hasError } =
  userVote.actions;

export default userVote.reducer;
