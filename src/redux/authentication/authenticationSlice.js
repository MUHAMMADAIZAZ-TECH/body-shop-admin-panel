import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { userLogin } from "./authApis";

const initialState = {
    loading:false,
    isLogin:true,
    error:false,
    message:"",
    user:{}
}
export const UserLogin = createAsyncThunk(
    'web/login',
    async (state) => {
        const response = await userLogin(state)
        return response;
    }
);
const authenticationSlice = createSlice({
    name:'authentication',
    initialState,
    reducers:{
        openProfile:(state,action)=>{
            state.opencommentsection = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(UserLogin.pending, (state) => {
            state.loading = true;
            state.isLogin = false;
            state.error = null;
          })
          .addCase(UserLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.isLogin = true;
            state.user = action?.payload?.data?.user
            state.message = action.payload.message;
          })
          .addCase(UserLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.message = action.error.message;
          });
      },
})


export const { openProfile } = authenticationSlice.actions

export default authenticationSlice.reducer;