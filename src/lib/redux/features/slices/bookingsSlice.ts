import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Models } from "appwrite";
import storage from "redux-persist/lib/storage";
const bookingsPersistConfig = {
  key: "bookings",
  storage,
};

type TInitialBookingsState = {

  bookings:Models.Document[]
 
};
const bookingsSlice = createSlice({
  initialState: {  } as TInitialBookingsState,
  name: "bookings",
  reducers: {

    setBookings:(state, action)=>{
      state.bookings = action.payload
      
    }
    
    
  },
});

// Export your bookingsSlice and persist config
export { bookingsPersistConfig };
export const { } = bookingsSlice.actions;
export default bookingsSlice.reducer;
