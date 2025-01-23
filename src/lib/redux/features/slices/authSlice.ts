import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
const authPersistConfig = {
  key: "auth",
  storage,
};

type TInitialAuthState = {
  isAuthenticated: boolean;
};
const authSlice = createSlice({
  initialState: { isAuthenticated: false } as TInitialAuthState,
  name: "auth",
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

// Export your authSlice and persist config
export { authPersistConfig };
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
