import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
const providersPersistConfig = {
  key: "providers",
  storage,
};

type TInitialProvidersState = {
 
};
const providersSlice = createSlice({
  initialState: {  } as TInitialProvidersState,
  name: "providers",
  reducers: {
    
  },
});

// Export your providersSlice and persist config
export { providersPersistConfig };
export const { } = providersSlice.actions;
export default providersSlice.reducer;
