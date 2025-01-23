import { IUser } from "@/interfaces/user.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type TInitialState = {
  isAuthenticated: boolean;
  bio_data: IUser | null;
};
const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    bio_data: null,
  } as TInitialState,
  reducers: {
    updateBio(state, { payload }: PayloadAction<IUser>) {
      state.bio_data = payload;
    },
    logout(state){
        state.isAuthenticated = false;
    },
    login(state){
        state.isAuthenticated = true;
    }
  },
});

export const {login,logout,updateBio}= userSlice.actions;

export default userSlice.reducer;