import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Models } from "appwrite";
import storage from "redux-persist/lib/storage";
const servicesPersistConfig = {
  key: "services",
  storage,
};

type TInitialServicesState = {
 services:Models.Document[]
};
const servicesSlice = createSlice({
  initialState: {  } as TInitialServicesState,
  name: "services",
  reducers: {
    setSetvices:(state, action)=>{
      state.services = action.payload
      
    }
    
  },
});

// Export your servicesSlice and persist config
export { servicesPersistConfig };
export const { } = servicesSlice.actions;
export default servicesSlice.reducer;
