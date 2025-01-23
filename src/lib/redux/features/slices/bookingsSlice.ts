import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
const bookingsPersistConfig = {
  key: "bookings",
  storage,
};

type TInitialBookingsState = {
 
};
const bookingsSlice = createSlice({
  initialState: {  } as TInitialBookingsState,
  name: "bookings",
  reducers: {
    
  },
});

// Export your bookingsSlice and persist config
export { bookingsPersistConfig };
export const { } = bookingsSlice.actions;
export default bookingsSlice.reducer;
