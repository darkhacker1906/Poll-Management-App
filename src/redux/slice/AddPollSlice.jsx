import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    loading: false,
    isError: false,
    isSuccess: false,
    data: {},
  };
  export const AddPoll={
    name: "addPoll",
  initialState: initialState,
   reducers:{
    startLoading:(state)=>{
        state.loading = true;
        state.isError = false;
    },
    pollingSuccessful: (state, action) => {
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
   }
  }
  export const addPollApi=(payload)=>async (dispatch)=>{

  }