import { createSlice } from "@reduxjs/toolkit";
import Instance from "../../axios/BaseUrl";
const initialState={
    loading:false,
    isError:false,
    isSuccess:false,
    data:{},
}
export const signIn=createSlice({
    name:"signIn",
    initialState:initialState,
    reducers:{
        startLoading:(state)=>{
            state.loading=true,
            state.isError=false
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
            state.isError = false;
            state.loading = false;
            state.isSuccess = false;
            state.data = {};
          },
    }
})

export const signInApi=(payload)=>async(dispatch)=>{
  dispatch(startLoading());
  try{
    let response=await Instance.post(
      `login?username=${payload.name}&password=${payload.password}`
    )
    // console.log(response);
    dispatch(loginSuccessful(response.data));
  }catch(error){
     dispatch(hasError(error))
     console.log(error,"gggg");
  }
};
console.log(signInApi);
export const{startLoading,hasError,loginSuccessful,signupResetReducer}= signIn.actions;
export default signIn.reducer;