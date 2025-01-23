import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
const servicesPersistConfig = {
  key: "services",
  storage,
};

type TInitialServicesState = {
 
};
const servicesSlice = createSlice({
  initialState: {  } as TInitialServicesState,
  name: "services",
  reducers: {
    
  },
});

// Export your servicesSlice and persist config
export { servicesPersistConfig };
export const { } = servicesSlice.actions;
export default servicesSlice.reducer;
