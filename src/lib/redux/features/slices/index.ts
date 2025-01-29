import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { authReducer } from "./authSlice";
import storage from "redux-persist/es/storage"


const authConfig = {
  key: 'auth',storage
}
const bookingConfig = {
  key: 'booking',
  storage
}

const rootReducer = combineReducers({
  auth:persistReducer(authConfig, authReducer),
  // booking: persistReducer(bookingConfig, bookingReducer)
  
});

export default rootReducer;

