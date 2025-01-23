import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
const notificationsPersistConfig = {
  key: "notifications",
  storage,
};

type TInitialNotificationsState = {
 
};
const notificationsSlice = createSlice({
  initialState: {  } as TInitialNotificationsState,
  name: "notifications",
  reducers: {
    
  },
});

// Export your notificationsSlice and persist config
export { notificationsPersistConfig };
export const { } = notificationsSlice.actions;
export default notificationsSlice.reducer;
