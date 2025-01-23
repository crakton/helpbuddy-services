import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { IUser } from "@/interfaces";
const profilePersistConfig = {
  key: "profile",
  storage,
};

type TInitialProfileState = {
  profile_data: IUser | null;
};
const profileSlice = createSlice({
  initialState: { profile_data: null } as TInitialProfileState,
  name: "profile",
  reducers: {
    setProfile(state, { payload }: PayloadAction<IUser>) {
      state.profile_data = payload;
    },
  },
});

// Export your profileSlice and persist config
export { profilePersistConfig };
export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
