import { createSlice } from "@reduxjs/toolkit";
import { Models } from "appwrite";


interface initialStatus  {
  user:Models.User<Models.Preferences>
}
const authSlice  = createSlice({
  name:"auth",
  initialState:{} as initialStatus,
  reducers:{
    setUser:(state,action)=>{
      state.user = action.payload

    }
  }
})


export const {setUser} = authSlice.actions
export const authReducer  = authSlice.reducer