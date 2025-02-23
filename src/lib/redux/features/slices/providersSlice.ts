import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Models } from "appwrite";
import storage from "redux-persist/lib/storage";
const providersPersistConfig = {
  key: "providers",
  storage,
};

type TInitialProvidersState = {
 providers:Models.Document[]
};
const providersSlice = createSlice({
  initialState: {  } as TInitialProvidersState,
  name: "providers",
  reducers: {

    setProviders:(state, action)=>{
        state.providers = action.payload
    }
    
  },
});

// Export your providersSlice and persist config
export { providersPersistConfig };
export const { } = providersSlice.actions;
export default providersSlice.reducer;
